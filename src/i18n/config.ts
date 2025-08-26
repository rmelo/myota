import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
    en: {
        translation: {
            datePicker: {
                placeholder: "Select date",
                today: "Today",
                months: {
                    january: "January",
                    february: "February",
                    march: "March",
                    april: "April",
                    may: "May",
                    june: "June",
                    july: "July",
                    august: "August",
                    september: "September",
                    october: "October",
                    november: "November",
                    december: "December"
                },
                weekdays: {
                    short: {
                        sunday: "Sun",
                        monday: "Mon",
                        tuesday: "Tue",
                        wednesday: "Wed",
                        thursday: "Thu",
                        friday: "Fri",
                        saturday: "Sat"
                    }
                }
            },
            demo: {
                title: "Online Travel Agency",
                datePickerDemo: "DatePicker Component Demo",
                basicDateSelection: "Basic Date Selection:",
                travelBookingExample: "Travel Booking Example:",
                checkInDate: "Check-in Date:",
                checkOutDate: "Check-out Date:",
                disabledDatePicker: "Disabled DatePicker:",
                disabledPlaceholder: "This datepicker is disabled",
                bookingSummary: "Booking Summary:",
                selected: "Selected:",
                checkIn: "Check-in:",
                checkOut: "Check-out:",
                duration: "Duration:",
                nights: "nights"
            },
            language: {
                selector: "Language:",
                english: "English",
                spanish: "Español",
                french: "Français",
                german: "Deutsch",
                portuguese: "Português"
            }
        }
    },
    es: {
        translation: {
            datePicker: {
                placeholder: "Seleccionar fecha",
                today: "Hoy",
                months: {
                    january: "Enero",
                    february: "Febrero",
                    march: "Marzo",
                    april: "Abril",
                    may: "Mayo",
                    june: "Junio",
                    july: "Julio",
                    august: "Agosto",
                    september: "Septiembre",
                    october: "Octubre",
                    november: "Noviembre",
                    december: "Diciembre"
                },
                weekdays: {
                    short: {
                        sunday: "Dom",
                        monday: "Lun",
                        tuesday: "Mar",
                        wednesday: "Mié",
                        thursday: "Jue",
                        friday: "Vie",
                        saturday: "Sáb"
                    }
                }
            },
            demo: {
                title: "Agencia de Viajes Online",
                datePickerDemo: "Demostración del Componente DatePicker",
                basicDateSelection: "Selección Básica de Fecha:",
                travelBookingExample: "Ejemplo de Reserva de Viaje:",
                checkInDate: "Fecha de Check-in:",
                checkOutDate: "Fecha de Check-out:",
                disabledDatePicker: "DatePicker Deshabilitado:",
                disabledPlaceholder: "Este selector de fecha está deshabilitado",
                bookingSummary: "Resumen de Reserva:",
                selected: "Seleccionado:",
                checkIn: "Check-in:",
                checkOut: "Check-out:",
                duration: "Duración:",
                nights: "noches"
            },
            language: {
                selector: "Idioma:",
                english: "English",
                spanish: "Español",
                french: "Français",
                german: "Deutsch",
                portuguese: "Português"
            }
        }
    },
    fr: {
        translation: {
            datePicker: {
                placeholder: "Sélectionner une date",
                today: "Aujourd'hui",
                months: {
                    january: "Janvier",
                    february: "Février",
                    march: "Mars",
                    april: "Avril",
                    may: "Mai",
                    june: "Juin",
                    july: "Juillet",
                    august: "Août",
                    september: "Septembre",
                    october: "Octobre",
                    november: "Novembre",
                    december: "Décembre"
                },
                weekdays: {
                    short: {
                        sunday: "Dim",
                        monday: "Lun",
                        tuesday: "Mar",
                        wednesday: "Mer",
                        thursday: "Jeu",
                        friday: "Ven",
                        saturday: "Sam"
                    }
                }
            },
            demo: {
                title: "Agence de Voyage en Ligne",
                datePickerDemo: "Démonstration du Composant DatePicker",
                basicDateSelection: "Sélection de Date Basique:",
                travelBookingExample: "Exemple de Réservation de Voyage:",
                checkInDate: "Date d'Arrivée:",
                checkOutDate: "Date de Départ:",
                disabledDatePicker: "DatePicker Désactivé:",
                disabledPlaceholder: "Ce sélecteur de date est désactivé",
                bookingSummary: "Résumé de Réservation:",
                selected: "Sélectionné:",
                checkIn: "Arrivée:",
                checkOut: "Départ:",
                duration: "Durée:",
                nights: "nuits"
            },
            language: {
                selector: "Langue:",
                english: "English",
                spanish: "Español",
                french: "Français",
                german: "Deutsch",
                portuguese: "Português"
            }
        }
    },
    de: {
        translation: {
            datePicker: {
                placeholder: "Datum auswählen",
                today: "Heute",
                months: {
                    january: "Januar",
                    february: "Februar",
                    march: "März",
                    april: "April",
                    may: "Mai",
                    june: "Juni",
                    july: "Juli",
                    august: "August",
                    september: "September",
                    october: "Oktober",
                    november: "November",
                    december: "Dezember"
                },
                weekdays: {
                    short: {
                        sunday: "So",
                        monday: "Mo",
                        tuesday: "Di",
                        wednesday: "Mi",
                        thursday: "Do",
                        friday: "Fr",
                        saturday: "Sa"
                    }
                }
            },
            demo: {
                title: "Online-Reisebüro",
                datePickerDemo: "DatePicker-Komponenten-Demo",
                basicDateSelection: "Grundlegende Datumsauswahl:",
                travelBookingExample: "Reisebuchungsbeispiel:",
                checkInDate: "Check-in-Datum:",
                checkOutDate: "Check-out-Datum:",
                disabledDatePicker: "Deaktivierter DatePicker:",
                disabledPlaceholder: "Dieser Datumsauswähler ist deaktiviert",
                bookingSummary: "Buchungszusammenfassung:",
                selected: "Ausgewählt:",
                checkIn: "Check-in:",
                checkOut: "Check-out:",
                duration: "Dauer:",
                nights: "Nächte"
            },
            language: {
                selector: "Sprache:",
                english: "English",
                spanish: "Español",
                french: "Français",
                german: "Deutsch",
                portuguese: "Português"
            }
        }
    },
    pt: {
        translation: {
            datePicker: {
                placeholder: "Selecionar data",
                today: "Hoje",
                months: {
                    january: "Janeiro",
                    february: "Fevereiro",
                    march: "Março",
                    april: "Abril",
                    may: "Maio",
                    june: "Junho",
                    july: "Julho",
                    august: "Agosto",
                    september: "Setembro",
                    october: "Outubro",
                    november: "Novembro",
                    december: "Dezembro"
                },
                weekdays: {
                    short: {
                        sunday: "Dom",
                        monday: "Seg",
                        tuesday: "Ter",
                        wednesday: "Qua",
                        thursday: "Qui",
                        friday: "Sex",
                        saturday: "Sáb"
                    }
                }
            },
            demo: {
                title: "Agência de Viagens Online",
                datePickerDemo: "Demonstração do Componente DatePicker",
                basicDateSelection: "Seleção Básica de Data:",
                travelBookingExample: "Exemplo de Reserva de Viagem:",
                checkInDate: "Data de Check-in:",
                checkOutDate: "Data de Check-out:",
                disabledDatePicker: "DatePicker Desabilitado:",
                disabledPlaceholder: "Este seletor de data está desabilitado",
                bookingSummary: "Resumo da Reserva:",
                selected: "Selecionado:",
                checkIn: "Check-in:",
                checkOut: "Check-out:",
                duration: "Duração:",
                nights: "noites"
            },
            language: {
                selector: "Idioma:",
                english: "English",
                spanish: "Español",
                french: "Français",
                german: "Deutsch",
                portuguese: "Português"
            }
        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false, // React already escapes values
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        // Prevent hydration mismatch
        react: {
            useSuspense: false,
        },
    })

export default i18n
