/*
Заглушка
 */
let bars = [
    {
        "barid": 1,
        "startdate": 1988,
        "enddate": 2010,
        "color": "2",
        "events": [
            {
                "eventid": 2,
                "barid": 1,
                "eventdate": "2005-01-08",
                "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAIAAADYhlU4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADMSURBVEhL7ZZBDsIwDAQDX+DKkf+/iCNX/sBKjkKbNPbajS+IUaWmUpXJri+5vO+Pksy1vjOpjtvriUfWy6mO1Ma+XUGTFGU3j4Wa7T79zDPS9A6wXHPgAF5N9zM+sUP9mDkAr+l2HJk6SEwBOOVgBEBz6HWRAmDkmGl4AbC7GjUuATg7cwbKsY3iDQHYHKIJCICvq4AAsA5J0BpzYTvCFTXYmbdFIIrhGBMENNrdR6nI1d6xQ06q78Jr4nc45hzCj90TU/k7ePIdpXwAHphumK3H9lIAAAAASUVORK5CYII="
            },
            {
                "eventid": 1,
                "barId": 1,
                "eventdate": "2005-01-08",
                "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAIAAADYhlU4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADMSURBVEhL7ZZBDsIwDAQDX+DKkf+/iCNX/sBKjkKbNPbajS+IUaWmUpXJri+5vO+Pksy1vjOpjtvriUfWy6mO1Ma+XUGTFGU3j4Wa7T79zDPS9A6wXHPgAF5N9zM+sUP9mDkAr+l2HJk6SEwBOOVgBEBz6HWRAmDkmGl4AbC7GjUuATg7cwbKsY3iDQHYHKIJCICvq4AAsA5J0BpzYTvCFTXYmbdFIIrhGBMENNrdR6nI1d6xQ06q78Jr4nc45hzCj90TU/k7ePIdpXwAHphumK3H9lIAAAAASUVORK5CYII="
            }
        ]
    }, {
        "barid": 2,
        "startdate": 1988,
        "enddate": 2010,
        "color": "2",
        "events": [
            {
                "eventid": 2,
                "barid": 1,
                "eventdate": "2005-01-08",
                "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAIAAADYhlU4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADMSURBVEhL7ZZBDsIwDAQDX+DKkf+/iCNX/sBKjkKbNPbajS+IUaWmUpXJri+5vO+Pksy1vjOpjtvriUfWy6mO1Ma+XUGTFGU3j4Wa7T79zDPS9A6wXHPgAF5N9zM+sUP9mDkAr+l2HJk6SEwBOOVgBEBz6HWRAmDkmGl4AbC7GjUuATg7cwbKsY3iDQHYHKIJCICvq4AAsA5J0BpzYTvCFTXYmbdFIIrhGBMENNrdR6nI1d6xQ06q78Jr4nc45hzCj90TU/k7ePIdpXwAHphumK3H9lIAAAAASUVORK5CYII="
            },
            {
                "eventid": 1,
                "barid": 1,
                "eventdate": "2005-01-08",
                "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAIAAADYhlU4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADMSURBVEhL7ZZBDsIwDAQDX+DKkf+/iCNX/sBKjkKbNPbajS+IUaWmUpXJri+5vO+Pksy1vjOpjtvriUfWy6mO1Ma+XUGTFGU3j4Wa7T79zDPS9A6wXHPgAF5N9zM+sUP9mDkAr+l2HJk6SEwBOOVgBEBz6HWRAmDkmGl4AbC7GjUuATg7cwbKsY3iDQHYHKIJCICvq4AAsA5J0BpzYTvCFTXYmbdFIIrhGBMENNrdR6nI1d6xQ06q78Jr4nc45hzCj90TU/k7ePIdpXwAHphumK3H9lIAAAAASUVORK5CYII="
            }
        ]
    }
]

//TODO: добавить логику с заглушками
let id = location.pathname.slice(1);
// bars.forEach(printBar);
getAllClientBars(id);

function printBar(bar, index) {
    const TIMELINE_ID = "timeline";
    const TIMELINE_TRACK_ID = "timeline-track";
    const HALFYEARMARK_CLASS_NAME = "half-year";
    const MONTHMARK_CLASS_NAME = "month";
    let barDuration = bar.enddate - bar.startdate;
    let barStep = barDuration > 20 ? 5 : 1;                                     //Для больших шкал, шаг - 5 лет
    let timeline = document.getElementById(TIMELINE_ID + index);
    let timelineTrack = document.getElementById(TIMELINE_TRACK_ID + index);

    for (let year = bar.startdate; year <= bar.enddate; year += barStep) {
        printYearMark(year, bar, barStep, barDuration, timeline);
        if (year + barStep > bar.enddate) break;
        if (barDuration > 10) {                                                 //Для маленьких шкал (< 10 лет)
            printInterimMark(timeline, HALFYEARMARK_CLASS_NAME);                //рисуем штрихи для каждого месяца,
        } else {                                                                //иначе рисуем штрихи для полугодий
            for (let i = 0; i < 11; i++) {
                printInterimMark(timeline, MONTHMARK_CLASS_NAME);
            }
        }
    }
    bar.events.forEach((event) => printEventMark(event.eventdate, bar, timelineTrack));
}

function printYearMark(year, bar, barStep, barDuration, timeline) {
    let yearMark = document.createElement('div');
    yearMark.className = "year";
    let yearLabel = document.createElement('div');
    yearLabel.innerHTML = year;
    yearLabel.style.marginLeft = "-13px";
    yearMark.appendChild(yearLabel);
    if (year + barStep > bar.enddate) {
        yearMark.style.width = "2px";
        /*
         * Если шаг больше одного года и у диапозона шкалы есть остаток от деления на шаг, то у последнего года делаем
         * отступ справа, пропорциональный этому остатку, а в конец шкалы добавляем метку с последним годов для этой шкалы.
         * Например: шкала - 1990-2011 (21 год), шаг - 5 лет, у метки 2010 года справа будет отступ на один год,
         * а в конец шкалы добавится метка 2011 года.
         */
        if (barStep > 1) {
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
    eventMark.innerHTML = new Date(eventDate).toLocaleDateString();
    eventMark.style.left = calculatePosition(new Date(bar.startdate, 0, 1),     //Границы шкалы - 01 января
        new Date(bar.enddate, 0, 1),
        new Date(eventDate));
    timeline.appendChild(eventMark);
}

/*
 * Вычисляется количество дней в шкале и количество дней от начала шкалы до даты события. Принимаем
 * длину шкалы (в днях) за 100% и вычисляем отношение количества дней до события ко всей шкале
 * (в процентах), а полученное значение применяется в качестве отпуства метки события от левого края.
 */
function calculatePosition(start, end, event) {
    const oneDay = 24 * 60 * 60 * 1000;                                         //Перевод милисекунд в дни
    const barDays = Math.round(Math.abs((end - start) / oneDay));
    const eventDays = Math.round(Math.abs((event - start) / oneDay));
    return eventDays * 100 / barDays + "%";
}

async function getAllClientBars(id) {
    let response = await fetch(`/getBars/${id}`);
    bars = await response.json();
    bars.forEach(printBar);
}

/*
Генерируется уникальный id для сохранения шкал. Подменяется запрос через location.search;
 */
function generateID() {
    const template = 'ABCDEFGHIJKLMNOPQRSTUYQVWZXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let phrase = '';
    for (let i = 0; i < 8; i++) {
        phrase += template[Math.floor(Math.random() * template.length)];
    }
    return phrase;
}

function openForm() {
    barform.style.display = "block";
    createBarButton.style.display = "none";
    sendBarButton.style.display = "block";
}

async function sendBar() {
    let isFirstBar = id === "";
    let bar = {};
    let formData = new FormData(barform);
    createBarButton.style.display = "block";
    sendBarButton.style.display = "none";
    barform.style.display = "none";
    bar.events = [];
    /*
     * TODO: отвязать код от жестких связей с формой:
     *  [...barform.children].forEach((a) => {
     *     bar[a.name] = a.value;
     *  });
     */
    bar.color = formData.get("color");
    bar.startdate = parseInt(formData.get("startdate"));
    bar.enddate = parseInt(formData.get("enddate"));
    if (isFirstBar) {
        id = generateID();
        bar.barid = 1;
    } else {
        bar.barid = bars[0].barid === 1 ? 2 : 1;
        // FIXME: очищать шкалу перед новой отрисовкой
        printBar(bar, 1);
        bars.push(bar);
    }
    bar.clientid = id;
    let response = await fetch('/setBar', {
        method: 'POST',
        body: JSON.stringify(bar),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (isFirstBar) {
        location.pathname = id;
    }
}

//TODO: добавить логику для событий
