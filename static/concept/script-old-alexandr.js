/*
Заглушка
 */
let bars = [{
    startDate: 2005,
    endDate: 2010,
    events: [
        {eventDate: "2005.03.01"},
        {eventDate: "2010.01.01"}
    ]
}, {
    startDate: 1980,
    endDate: 2017,
    events: [
        {eventDate: "2000.03.01"},
        {eventDate: "1980.07.14"},
        {eventDate: "2010.01.01"},
        {eventDate: "2014.12.19"}
    ]
}];

bars.forEach(printBar);

function printBar(bar, index) {
    const TIMELINE_ID = "timeline";
    const TIMELINE_TRACK_ID = "timeline-track";
    const HALFYEARMARK_CLASS_NAME = "half-year";
    const MONTHMARK_CLASS_NAME = "month";
    let barDuration = bar.endDate - bar.startDate;
    let barStep = barDuration > 20 ? 5 : 1;                                     //Для больших шкал, шаг - 5 лет
    let timeline = document.getElementById(TIMELINE_ID + index);
    let timelineTrack = document.getElementById(TIMELINE_TRACK_ID + index);

    for (let year = bar.startDate; year <= bar.endDate; year += barStep) {
        printYearMark(year, bar, barStep, barDuration, timeline);
        if (year + barStep > bar.endDate) break;
        if (barDuration > 10) {                                                 //Для маленьких шкал (< 10 лет)
            printInterimMark(timeline, HALFYEARMARK_CLASS_NAME);                //рисуем штрихи для каждого месяца,
        } else {                                                                //иначе рисуем штрихи для полугодий
            for(let i = 0; i < 11; i++) {
                printInterimMark(timeline, MONTHMARK_CLASS_NAME);
            }
        }
    }
    bar.events.forEach((event) => printEventMark(event.eventDate, bar, timelineTrack));
}

function printYearMark(year, bar, barStep, barDuration, timeline){
    let yearMark = document.createElement('div');
    yearMark.className = "year";
    let yearLabel = document.createElement('div');
    yearLabel.innerHTML = year;
    yearLabel.style.marginLeft = "-13px";
    yearMark.appendChild(yearLabel);
    if (year + barStep > bar.endDate) {
        yearMark.style.width = "2px";
        /*
        Если шаг больше одного года и у диапозона шкалы есть остаток от деления на шаг, то у последней года делаем
        отступ справа, пропорциональный этому остатку, а в конец шкалы добавляем метку с последним годов для этой шкалы.
        Например: шкала - 1990-2011 (21 год), шаг - 5 лет, у метки 2010 года справа будет отступ на один год,
        а в конец шкалы добавится метка 2011 года.
         */
        if(barStep > 1) {
            let margin = (100 / (barDuration / 5)) * (0.2 * (barDuration % 5));
            yearMark.style.marginRight = margin + "%";
            if (margin > 0) {
                let lastYearLabel = document.createElement('div');
                lastYearLabel.className = "year";
                lastYearLabel.style.position = "absolute";
                lastYearLabel.style.right = "0px";
                lastYearLabel.style.width = "2px";
                let yearLabel = document.createElement('div');
                yearLabel.innerHTML = bar.endDate;
                yearLabel.style.marginLeft = "-13px";
                lastYearLabel.appendChild(yearLabel);
                timeline.appendChild(lastYearLabel);
            }
        }
    }
    timeline.appendChild(yearMark);
}

function printInterimMark(timeline, className) {
    let mark = document.createElement('div');
    mark.className = className;
    mark.innerHTML = "";
    timeline.appendChild(mark);
}

function printEventMark(eventDate, bar, timeline) {
    let eventMark = document.createElement('div');
    eventMark.className = "event";
    eventMark.innerHTML = eventDate;
    eventMark.style.left = calculatePosition(new Date(bar.startDate, 0, 1),     //Границы шкалы - 01 января
                                             new Date(bar.endDate, 0, 1),
                                             new Date(eventDate));
    timeline.appendChild(eventMark);
}
/*
Вычисляется количество дней в шкале и количество дней от начала шкалы до даты события. Принимаем
длину шкалы (в днях) за 100% и вычисляем отношение количества дней до события ко всей шкале
(в процентах), а полученное значение применяется в качестве отпуства метки события от левого края.
 */
function calculatePosition(start, end, event) {
    const oneDay = 24 * 60 * 60 * 1000;                                         //Перевод милисекунд в дни
    const barDays = Math.round(Math.abs((end - start) / oneDay));
    const eventDays = Math.round(Math.abs((event - start) / oneDay));
    return eventDays * 100 / barDays + "%";
}