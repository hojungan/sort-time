let _measuredTime = {
  'bubble': [0],
  'insert': [0],
  'select': [0],
  'merge': [0],
  'quick': [0],
  'radix': [0]
}
let _currentSortAlgorithm = undefined
const ctx = document.getElementById( 'myChart' );

let myChart = new Chart( ctx, {
  type: 'line',
  data: {
    labels: [0],
    datasets: [
      {
        'label': 'Bubble Sort',
        'data': _measuredTime['bubble'],
        'backgroundColor': 'rgb(232, 98, 9)',
        'borderColor': 'rgb(255, 148, 77)',
        'fill': false,
        'lineTension': 0
      },
      {
        'label': 'Insertion Sort',
        'data': _measuredTime['insert'],
        'backgroundColor': 'rgb(145, 255, 0)',
        'borderColor': 'rgb(185, 255, 92)',
        'fill': false,
        'lineTension': 0
      },
      {
        'label': 'Selection Sort',
        'data': _measuredTime['select'],
        'backgroundColor': 'rgb(0, 245, 184)',
        'borderColor': 'rgb(120, 255, 221)',
        'fill': false,
        'lineTension': 0
      },
      {
        'label': 'Merge Sort',
        'data': _measuredTime['merge'],
        'backgroundColor': 'rgb(0, 123, 255)',
        'borderColor': 'rgb(99, 174, 255)',
        'fill': false,
        'lineTension': 0
      },
      {
        'label': 'Quick Sort',
        'data': _measuredTime['quick'],
        'backgroundColor': 'rgb(215, 218, 52)',
        'borderColor': 'rgb(251, 255, 0)',
        'fill': false,
        'lineTension': 0
      },
      {
        'label': 'Radix Sort',
        'data': _measuredTime['radix'],
        'backgroundColor': 'rgb(170, 0, 255)',
        'borderColor': 'rgb(203, 99, 255)',
        'fill': false,
        'lineTension': 0
      },
    ]
  },
  options: {
    scales: {
      yAxes: [{
        display: true,
        labelString: 'milliseconds',
        lineHeight: 5,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
} )

function reloadPage () {
  location.reload()
}

async function addData ( e ) {
  const dataSize = +document.querySelector( '#data-size' ).value
  let loader = document.querySelector( '.lds-spinner' )
  let _randomArray = []
  let start = 0
  let finish = 0

  _currentSortAlgorithm = e.id

  for ( let i = 0; i < dataSize; i++ ) {
    _randomArray.push( Math.floor( Math.random() * dataSize ) )
  }

  switch ( _currentSortAlgorithm ) {
    case 'bubble':
      start = Date.now()
      await bubbleSort( _randomArray )
      finish = Date.now()
      break
    case 'insert':
      start = Date.now()
      await insertionSort( _randomArray )
      finish = Date.now()
      break
    case 'select':
      start = Date.now()
      await selectionSort( _randomArray )
      finish = Date.now()
      break
    case 'merge':
      start = Date.now()
      await mergeSort( _randomArray, 0, _randomArray.length - 1, [] )
      finish = Date.now()
      break
    case 'quick':
      start = Date.now()
      await quickSort( _randomArray, 0, _randomArray.length - 1 )
      finish = Date.now()
      break
    case 'radix':
      start = Date.now()
      await radixSort( _randomArray )
      finish = Date.now()
      break
  }

  let _time = ( finish - start )

  _measuredTime[_currentSortAlgorithm].push( _time )

  if ( !myChart.data.labels.includes( dataSize ) ) {
    myChart.data.labels.push( dataSize )
  }

  myChart.update()

  listSortRan( e.innerHTML, dataSize, _time )
}

function listSortRan ( sortLabel, dataSize, time ) {
  const list = document.querySelector( '#list-stack' )

  let li = document.createElement( 'li' )
  li.className = 'list-group-item'
  li.innerHTML = `Algorithm: <strong>${sortLabel}</strong> | Data Size: ${dataSize} | Time (ms): ${time}ms`

  list.insertBefore( li, list.childNodes[0] )
}