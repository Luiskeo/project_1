import { useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../i18n";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (lang) => {
        changeLanguage(lang);
        setIsOpen(false);
    };

    const getLabel = (lang) => {
        switch (lang) {
            case "en":
                return "🇬🇧 EN";
            case "es":
                return "🇪🇸 ES";
            case "fr":
                return "🇫🇷 FR";
            case "de":
                return "🇩🇪 DE";
            default:
                return "";
        }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                onClick={toggleDropdown}
                style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    background: "#201f1f",
                    color: "#fff",
                    borderRadius: "4px",
                }}
            >
                🌍 {getLabel(i18n.language)}
            </button>
            {isOpen && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        border: "1px solid #ccc",
                        background: "#fff",
                        borderRadius: "4px",
                        width: "100%",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        zIndex: 1000,
                    }}
                >
                    {["en", "es", "fr", "de"].map((lang) => (
                        <li key={lang}>
                            <button
                                onClick={() => selectLanguage(lang)}
                                style={{
                                    padding: "8px 12px",
                                    width: "100%",
                                    textAlign: "left",
                                    border: "none",
                                    background: i18n.language === lang ? "#e0e0e0" : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                {getLabel(lang)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
