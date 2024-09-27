import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControllerSurah, ControllerTranslation } from "@ntq/sdk";
import { SurahViewProps, TranslationViewProps } from "@ntq/sdk/types";
import { Loading } from "@yakad/ui";

import { QuranConfigProps } from ".";
import SurahHeader from "./surahHeader";
import SurahText from "./text";
import { ConnectionContext } from "contexts";

export default function Quran(props: { config: QuranConfigProps }) {
    const navigate = useNavigate();

    const [surah, setSurah] = useState<SurahViewProps | null>(null);
    const [translation, setTranslation] = useState<TranslationViewProps | null>(
        null
    );

    const conn = useContext(ConnectionContext);

    useEffect(() => {
        if (props.config.translationUUID)
            new ControllerTranslation(conn!).view(props.config.translationUUID, {
                surah_uuid: props.config.surahUUID,
            }).then((response) => {
                setTranslation(response);
            });
    }, [props.config.surahUUID, props.config.translationUUID]);

    useEffect(() => {
        navigate("/quran/" + props.config.surahUUID);
        setSurah(null);
        new ControllerSurah(conn!).view(props.config.surahUUID, {}).then((response) => {
            setSurah(response);
        });
    }, [props.config.surahUUID]);

    return (
        <>
            {surah && translation ? (
                <>
                    <SurahHeader
                        config={props.config}
                        surahData={surah}
                        bismillahTranslation={translation.bismillah}
                    />
                    <SurahText
                        config={props.config}
                        surahData={surah}
                        translationData={translation}
                    />
                </>
            ) : (
                <Loading size="large" variant="dots" />
            )}
        </>
    );
}
