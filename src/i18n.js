import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    title: 'Weather App',
                    placeholder: 'Enter city name',
                    button: 'Get Weather',
                    createdBy: 'Created by OpenWeather',
                    feelsLike: 'Feels like:',
                    description: 'Weather description',
                },
            },
            ua: {
                translation: {
                    title: 'Погодний Додаток',
                    placeholder: 'Введіть назву міста',
                    button: 'Отримати Погоду',
                    createdBy: 'Створено за допомогою OpenWeather',
                    feelsLike: 'Відчувається як:',
                    description: 'Опис погоди',
                },
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;