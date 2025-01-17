import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@yakad/ui";
import { Xpanel } from "@yakad/x";
import Symbol from "@yakad/symbols";

import NavigationList from "./navigationList";
import QuranView from "./quran";
import { defaultConfigData } from "./config";

export interface QuranConfigProps {
    surahUUID: string;
    translationView: boolean;
    translationUUID: string | undefined;
}

export default function Quran() {
    const { id } = useParams();

    const [config, setConfig] = React.useState<QuranConfigProps>(
        defaultConfigData(id)
    );
    useEffect(() => {
        localStorage.setItem("config", JSON.stringify(config));
    }, [config]);

    return (
        <Xpanel
            name="Quran"
            navigationchildren={
                <NavigationList config={config} setConfig={setConfig} />
            }
            appbarchildren={
                <Link to="/">
                    <Button icon={<Symbol icon="search" />} />
                </Link>
            }
        >
            <QuranView config={config} />
        </Xpanel>
    );
}
