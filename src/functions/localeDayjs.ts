import dayjs from 'dayjs';
import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';

// Extend plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

// Update locales
dayjs.updateLocale('pt', {
    calendar: {
        lastDay: '[ontem]',
        sameDay: '[hoje]',
        nextDay: '[amanhã]',
        nextWeek: 'dddd',
        sameElse: 'dddd',
    },
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekdaysMin: ['Do', 'Se', 'Te', 'Qu', 'Qui', 'Se', 'Sá'],
});

dayjs.updateLocale('en', {
    calendar: {
        lastDay: '[yesterday]',
        sameDay: '[today]',
        nextDay: '[tomorrow]',
        nextWeek: 'dddd',
        sameElse: 'dddd',
    },
});

// custom serializer
// eslint-disable-next-line
(dayjs as any).prototype.toJSON = function () {
    return {
        __type: 'dayjs',
        // eslint-disable-next-line
        value: this.format(),
    };
};

// 👇 Important: export default
export default dayjs;
