
function bubbleSort ( data ) {
  for ( let i = 0; i < data.length; i++ ) {
    for ( let j = 0; j < data.length; j++ ) {
      let leftValue = data[j]
      let rightValue = data[j + 1]

      if ( leftValue > rightValue ) {
        let temp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = temp
      }
    }
  }
}


function merge ( mainArray, left, right, middle, auxArray ) {

  let i = left
  let j = middle + 1
  let k = left

  while ( i <= middle && j <= right ) {
    if ( auxArray[i] <= auxArray[j] ) {
      mainArray[k++] = auxArray[i++];
    } else {
      mainArray[k++] = auxArray[j++];
    }
  }
  while ( i <= middle ) {
    mainArray[k++] = auxArray[i++];
  }
  while ( j <= right ) {
    mainArray[k++] = auxArray[j++];
  }

}

function mergeSort ( mainArray, left, right, auxArray ) {
  if ( left == right ) return

  const middle = Math.floor( ( left + right ) / 2 )

  mergeSort( auxArray, left, middle, mainArray )
  mergeSort( auxArray, middle + 1, right, mainArray )

  merge( mainArray, left, right, middle, auxArray )
}


function insertionSort ( arr ) {
  // loop through the array
  for ( let i = 0; i < arr.length; i++ ) {
    let j = i + 1

    // go backwards until j is higher than j-1
    while ( j > 0 && arr[j] <= arr[j - 1] ) {
      // swap j and j-1
      let temp = arr[j]
      arr[j] = arr[j - 1]
      arr[j - 1] = temp
      --j
    }
  }
}


function selectionSort ( arr ) {
  let minvalIndx
  for ( let i = 0; i < arr.length - 1; i++ ) {
    minValIndx = i

    for ( let j = i + 1; j < arr.length; j++ ) {
      if ( arr[j] < arr[minValIndx] ) {
        minValIndx = j
      }
    }

    if ( minValIndx !== i ) {
      let temp = arr[i]
      arr[i] = arr[minValIndx]
      arr[minValIndx] = temp
    }
  }
}


function radixSort ( array ) {
  let count = new Array( 10 )
  count.fill( 0 )
  let output = []

  // used to get nth digit of the number
  // 0 for 1s, 1 for 10s, and 2 for 100s...
  let nthDigit = 0

  // find the largest value
  let maxVal = -1
  for ( let i = 0; i < array.length; i++ ) {
    if ( array[i] > maxVal ) maxVal = array[i]
  }

  let digitLength = maxVal.toString().length

  // loop for the length of digitLength+1
  for ( let i = 0; i < digitLength; i++ ) {
    // clear count array and output array
    count.fill( 0 )
    output = []

    // loop for the length of array.length
    for ( let j = 0; j < array.length; j++ ) {
      // get nth digit of the array[j]
      let digit = Math.floor( ( array[j] / Math.pow( 10, nthDigit ) ) % 10 )

      // increase by 1 at count[digit]
      count[digit] += 1
    }

    // create running sum of count
    for ( let l = 1; l < count.length; l++ ) {
      count[l] += count[l - 1]
    }

    // fill output array
    // traverse the array backwards
    for ( let k = array.length - 1; k >= 0; k-- ) {
      // get nth digit of the array[k]
      let digit = Math.floor( ( array[k] / Math.pow( 10, nthDigit ) ) % 10 )

      // get index from count array using digit
      let index = count[digit]

      count[digit] -= 1

      output[index - 1] = array[k]
    }

    // increase nthDigit by 1
    ++nthDigit

    // copy output array to array
    array = output
  }
}


function quickSort ( array, left, right ) {
  if ( left >= right ) { return }

  let pivot = partition( array, left, right )
  quickSort( array, left, pivot - 1 )
  quickSort( array, pivot + 1, right )
}

function partition ( array, left, right ) {
  let pivot = array[right]

  let i = left - 1
  for ( let j = left; j < right; j++ ) {
    if ( array[j] < pivot ) {
      i++
      let temp = array[j]
      array[j] = array[i]
      array[i] = temp
    }
  }

  let temp = array[right]
  array[right] = array[i + 1]
  array[i + 1] = temp

  return i + 1
}