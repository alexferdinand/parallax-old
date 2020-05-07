//Заглушка
let currentYear = new Date().getFullYear(); // текущий год
let input = {
  start: currentYear - 10, // текущий год минус 10 лет
  end: currentYear + 10, // текущий год плюс 10 лет
  events: [
    {date: "2015.03.01"},
    {date: "2028.05.01"},
    {date: "2022.01.01"},
    {date: "2011.06.01"},
    {date: "2025.07.01"},
    {date: "2020.02.01"},
    {date: "2017.09.01"}
  ]
};

//Автоматически определяем,какой будет шаг по умолчанию, можем прикрутить,чтобы пользователь менял его
let barLength = input.end - input.start;
let step = barLength > 20 ? 5 : 1;
//создаем отметки для годов
for (let year = input.start; year <= input.end; year += step) {
  let d = document.createElement('div');
  d.className = "year";
  let label = document.createElement('div');
  label.innerHTML = year;
  label.style.marginLeft = "-13px";
  d.appendChild(label);
  if (year + step > input.end) {
    d.style.width = "2px";
    // на случай,если шаг 5 лет ,а год метки не кратен 5 
    let margin = (100 / (barLength / 5)) * (0.2 * (barLength % 5));
    d.style.marginRight = margin + "%";
    if (margin > 0) {
      let d3 = document.createElement('div');
      d3.className = "year";
      d3.style.position = "absolute";
      d3.style.right = "0px";
      d3.style.width = "2px";
      let label = document.createElement('div');
      label.innerHTML = input.end;
      label.style.marginLeft = "-13px";
      d3.appendChild(label);
      document.getElementById("timeline").appendChild(d3);
    }
  }
  // если шкала больше 10 лет, то отмечаем черточками полугодия
  document.getElementById("timeline").appendChild(d);
  if (year + step <= input.end) {
    if (barLength > 10) {
      let d2 = document.createElement('div');
      d2.className = "half-year";
      d2.innerHTML = "";
      document.getElementById("timeline").appendChild(d2);
    }
    // если шкала меньше или 10 лет,то отмечаем черточками месяцы
    else {
      for (let i = 0; i < 11; i++) {
        let d2 = document.createElement('div');
        d2.className = "month";
        d2.innerHTML = "";
        document.getElementById("timeline").appendChild(d2);
      }
    }
  }
}
for (let i = 0; i < input.events.length; i++) {
  let event = document.createElement('div');
  event.className = "event";
  event.innerHTML = input.events[i].date;
  event.style.left = calculatePosition(new Date(input.start, 0, 1), new Date(input.end, 0, 1), new Date(input.events[i].date));
  document.getElementById("timeline-track").appendChild(event);
}
// Просчитываем позицию метки 
function calculatePosition(start, end, event) {
  // console.log(start,end,event);
  const oneDay = 24 * 60 * 60 * 1000;
  const barDays = Math.round(Math.abs((end - start) / oneDay));
  const eventDays = Math.round(Math.abs((event - start) / oneDay));
  //console.log(barDays, eventDays);
  return eventDays * 100 / barDays + "%";
}




//Автоматически определяем,какой будет шаг по умолчанию, можем прикрутить,чтобы пользователь менял его
barLength = input.end - input.start;
step = barLength > 20 ? 5 : 1;
//создаем отметки для годов
for (let year = input.start; year <= input.end; year += step) {
  let d = document.createElement('div');
  d.className = "year";
  let label = document.createElement('div');
  label.innerHTML = year;
  label.style.marginLeft = "-13px";
  d.appendChild(label);
  if (year + step > input.end) {
    d.style.width = "2px";
    // на случай,если шаг 5 лет ,а год метки не кратен 5 
    let margin = (100 / (barLength / 5)) * (0.2 * (barLength % 5));
    d.style.marginRight = margin + "%";
    if (margin > 0) {
      let d3 = document.createElement('div');
      d3.className = "year";
      d3.style.position = "absolute";
      d3.style.right = "0px";
      d3.style.width = "2px";
      let label = document.createElement('div');
      label.innerHTML = input.end;
      label.style.marginLeft = "-13px";
      d3.appendChild(label);
      document.getElementById("timeline1").appendChild(d3);
    }
  }
  // если шкала больше 10 лет, то отмечаем черточками полугодия
  document.getElementById("timeline1").appendChild(d);
  if (year + step <= input.end) {
    if (barLength > 10) {
      let d2 = document.createElement('div');
      d2.className = "half-year";
      d2.innerHTML = "";
      document.getElementById("timeline1").appendChild(d2);
    }
    // если шкала меньше или 10 лет,то отмечаем черточками месяцы
    else {
      for (let i = 0; i < 11; i++) {
        let d2 = document.createElement('div');
        d2.className = "month";
        d2.innerHTML = "";
        document.getElementById("timeline1").appendChild(d2);
      }
    }
  }
}
for (let i = 0; i < input.events.length; i++) {
  let event = document.createElement('div');
  event.className = "event";
  event.innerHTML = input.events[i].date;
  event.style.left = calculatePosition(new Date(input.start, 0, 1), new Date(input.end, 0, 1), new Date(input.events[i].date));
  document.getElementById("timeline-track1").appendChild(event);
}


let dummy = document.getElementById('scroll-container')


function elementMove(offset) {
  let parallaxLayer1 = document.querySelector('.parallax-layer-1')
  let parallaxLayer2 = document.querySelector('.parallax-layer-2')
  console.log(offset * 0.3)
  parallaxLayer1.style.marginLeft = offset * 0.3 + 'px'
  parallaxLayer2.style.marginLeft = offset * 0.7 + 'px'
}

dummy.addEventListener('scroll', function () {
  let Ycoord = Math.round(document.getElementById('scroll-dummy').getBoundingClientRect().left)
  console.log(Ycoord, 'px');
  elementMove(Ycoord)
});

let bigImg = document.getElementById('bubble-enlarge')

document.getElementById("bubble_3").addEventListener("click", function() {
  bigImg.style.display = 'block'
})

document.getElementById("bubble-enlarge").addEventListener("click", function() {
  bigImg.style.display = "block"  ? 'none' : "block"
})