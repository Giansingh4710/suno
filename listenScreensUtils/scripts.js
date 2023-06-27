const tracksPlayed = []
let TRACK_LINKS = []
let currentTrackPointer = -1
let skipByInterval = '10'
let shuffle = false

let currentLink // make it easier for sending to database
let currentArtist

const MAIN_TITLE = document.getElementsByTagName('title')[0].innerHTML
const theAudioPlayer = document.getElementsByTagName('audio')[0]
document.getElementById('MainTitle').innerText = MAIN_TITLE

const savedTracksKey = `SavedTracks: ${MAIN_TITLE}` //for localStorage
const checkedOptsKey = `CheckedOptions: ${MAIN_TITLE}`
const skipByKey = `Skip By Interval: ${MAIN_TITLE}`
const lastTimeStampKey = `Last Time Saved Interval: ${MAIN_TITLE}`

get_last_track_reset_stuff()
navigatorStuff()
local_save_track_modal()
global_modal_initialisation()

window.onbeforeunload = () => {
  localStorage.setItem(lastTimeStampKey, theAudioPlayer.currentTime)
  return null
}

function playNextTrack() {
  if (tracksPlayed.length === 0 || shuffle) {
    playRandTrack()
    return
  }

  let newTrackInd

  if (tracksPlayed.length - 1 === currentTrackPointer) {
    newTrackInd = tracksPlayed[currentTrackPointer] + 1
    newTrackInd = newTrackInd > TRACK_LINKS.length - 1 ? 0 : newTrackInd
    tracksPlayed.push(newTrackInd)
    currentTrackPointer += 1
  } else {
    currentTrackPointer += 1
    newTrackInd = tracksPlayed[currentTrackPointer]
  }
  playTrack(TRACK_LINKS[newTrackInd])
}

function toggleShuffle() {
  shuffle = !shuffle
  document.getElementById('shuffle').innerText = shuffle
    ? 'Shuffle: ON'
    : 'Shuffle: OFF'
  document.getElementById('shuffleBtn').style.backgroundColor = shuffle
    ? '#886BE4'
    : '#FFA500'

  localStorage.setItem('shuffle', shuffle)
}

function playPreviousTrack() {
  let newTrackInd
  if (currentTrackPointer === 0) {
    newTrackInd = tracksPlayed[currentTrackPointer] - 1
    newTrackInd = newTrackInd === -1 ? TRACK_LINKS.length - 1 : newTrackInd
    tracksPlayed.unshift(newTrackInd)
  } else {
    currentTrackPointer -= 1
    newTrackInd = tracksPlayed[currentTrackPointer]
  }

  if (TRACK_LINKS[newTrackInd] === undefined) {
    playRandTrack()
  } else {
    playTrack(TRACK_LINKS[newTrackInd])
  }
}

function playRandTrack() {
  const randNum = Math.floor(Math.random() * TRACK_LINKS.length)
  tracksPlayed.push(randNum)
  currentTrackPointer = tracksPlayed.length - 1
  playTrack(TRACK_LINKS[randNum])
}

function playTrack(theLinkOfTrack) {
  const artist = getTypeOfTrack(theLinkOfTrack)
  currentArtist = artist
  currentLink = theLinkOfTrack

  /* console.log(tracksPlayed, currentTrackPointer, theLinkOfTrack,artist) */
  console.log(tracksPlayed, `CurrentTrackPointer Index: ${currentTrackPointer}`)
  const theNameOfTrack = getNameOfTrack(theLinkOfTrack)
  const aTag = document.getElementById('trackNameAtag')

  aTag.innerText = theNameOfTrack
  aTag.href = theLinkOfTrack
  theAudioPlayer.src = theLinkOfTrack

  document.getElementById('trackPlaying').style.display = 'block'
  document.getElementById('trackFromWhichOpt').innerText = artist

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: theNameOfTrack,
      artist: artist,
      album: MAIN_TITLE,
    })
  }
  localStorage.setItem(`LastPlayed: ${MAIN_TITLE}`, theLinkOfTrack)
}

function saveTrack() {
  const note = document.getElementById('noteForSavedTrack')
  putTrackInLocalStorage(
    TRACK_LINKS[tracksPlayed[currentTrackPointer]],
    note.value
  )
  note.value = ''
  let modal = document.getElementById('saveTrackLocalModal')
  modal.style.display = 'none'
}

function deleteSavedTrack(link) {
  let savedTracks = localStorage.getItem(savedTracksKey)
  savedTracks = JSON.parse(savedTracks)
  delete savedTracks[link]
  localStorage.setItem(savedTracksKey, JSON.stringify(savedTracks))
  toggleSavedTracks()
  toggleSavedTracks()
}

function putTrackInLocalStorage(link, note) {
  let savedItems = localStorage.getItem(savedTracksKey)
  if (!savedItems) {
    savedItems = {}
  } else {
    savedItems = JSON.parse(savedItems)
  }

  savedItems[link] = note
  localStorage.setItem(savedTracksKey, JSON.stringify(savedItems))
}

function toggleSavedTracks() {
  const ol = document.getElementById('savedShabads')
  ol.style.display = 'block'
  if (ol.innerHTML !== '') {
    ol.innerHTML = ''
    ol.style.display = 'none'
    ol.style.display = 'none'
    return
  }

  let savedTracks = localStorage.getItem(`SavedTracks: ${MAIN_TITLE}`)
  savedTracks = JSON.parse(savedTracks)
  /* console.log(savedTracks) */

  for (const link in savedTracks) {
    const theNameOfTrack = getNameOfTrack(link)
    const trkMsg = savedTracks[link].replaceAll('\n', ' ')
    li = document.createElement('li')
    li.innerHTML = `${trkMsg}<button onclick="playTrack('${link}')" > ${theNameOfTrack}</button><button onclick="deleteSavedTrack('${link}')" >DELETE</button>`
    ol.appendChild(li)
    /* console.log(theNameOfTrack, ": ", trkMsg); */
  }
  if (!savedTracks || Object.keys(savedTracks).length === 0) {
    ol.innerText = 'No Saved Tracks. Click the Save button to Save tracks'
  }
}

function toggleShowingTracks() {
  const theDiv = document.getElementById('showAllTracks')
  if (theDiv.innerHTML === '') {
    theDiv.innerHTML = `<h5>There are ${TRACK_LINKS.length} tracks</h5>`
    const ol = document.createElement('ol')
    for (const link of TRACK_LINKS) {
      const li = document.createElement('li')
      li.innerHTML += `<button onclick="playTrack('${link}')">${getNameOfTrack(
        link
      )}</button>`
      ol.appendChild(li)
    }
    theDiv.appendChild(ol)
  } else {
    theDiv.innerHTML = ''
  }
}

function toggleShowingOpts() {
  const theDiv = document.getElementById('tracksOpts')
  const toggleBtn = document.getElementById('toggleShowingOpts')
  if (theDiv.style.display !== 'none') {
    theDiv.style.display = 'none'
    toggleBtn.innerText = 'Show The Options'
    localStorage.setItem('showOpts', false)
  } else {
    theDiv.style.display = 'block'
    toggleBtn.innerText = 'Hide The Options'
    localStorage.setItem('showOpts', true)
  }
}

function searchForShabad(e) {
  const searchVal = e
  const ol = document.getElementById('searchResults')

  const allLinksWithWordInds = []

  const searchWordsLst = searchVal.toLowerCase().split(' ')
  TRACK_LINKS.forEach((link, index) => {
    /* const trackName = getNameOfTrack(link) */
    const trackName = link.toLowerCase()
    let allWordsInTrackName = true
    for (const word of searchWordsLst) {
      if (!trackName.includes(word)) {
        allWordsInTrackName = false
        break
      }
    }
    if (allWordsInTrackName) {
      allLinksWithWordInds.push(index)
    }
  })

  ol.innerHTML = `<p>${allLinksWithWordInds.length} Results Found</p>`
  if (searchVal === '') {
    ol.innerHTML = ''
    return
  }

  for (const index of allLinksWithWordInds) {
    li = document.createElement('li')
    /* console.log(TRACK_LINKS[index]) */
    li.innerHTML = `<button onclick="playTrackForSearchedTrack(${index})">${getNameOfTrack(
      TRACK_LINKS[index]
    )}</button>`
    ol.appendChild(li)
  }
}

function navigatorStuff() {
  navigator.mediaSession.setActionHandler('play', () => theAudioPlayer.play())
  navigator.mediaSession.setActionHandler('pause', () => theAudioPlayer.pause())

  navigator.mediaSession.setActionHandler('seekforward', () => skipTrackTime(1))
  navigator.mediaSession.setActionHandler('seekbackward', () =>
    skipTrackTime(-1)
  )
  navigator.mediaSession.setActionHandler('previoustrack', playPreviousTrack)
  navigator.mediaSession.setActionHandler('nexttrack', playNextTrack)

  navigator.mediaSession.setActionHandler('seekto', function(event) {
    theAudioPlayer.currentTime = event.seekTime
  })
}

function getNameOfTrack(link) {
  const title = link.split('/').slice(-1)[0]
  return decodeURIComponent(decodeURIComponent(title))
}

function local_save_track_modal() {
  let modal = document.getElementById('saveTrackLocalModal')
  let btn = document.getElementById('saveTrackBtn')
  let span = document.getElementById('saveTrackLocalModalClose')
  btn.onclick = function() {
    modal.style.display = 'block'
  }
  span.onclick = function() {
    modal.style.display = 'none'
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}

function playTrackForSearchedTrack(ind) {
  playTrack(TRACK_LINKS[ind])
  tracksPlayed.push(ind)
  currentTrackPointer = tracksPlayed.length - 1
}

function excludeOrIncludeTracks() {
  const newLinks = []
  const checkedOpts = {}
  for (const opt in ALL_OPTS) {
    const val = document.getElementById(opt).checked
    ALL_OPTS[opt].checked = val
    if (val) {
      newLinks.push(...ALL_OPTS[opt].trackLinks)
      checkedOpts[opt] = true
    } else {
      checkedOpts[opt] = false
    }
  }
  localStorage.setItem(checkedOptsKey, JSON.stringify(checkedOpts))
  TRACK_LINKS = newLinks
  document.getElementById(
    'tracksData'
  ).innerText = `Total Tracks in Queue: ${TRACK_LINKS.length}`
}

function get_last_track_reset_stuff() {
  put_options()

  const checkedOpts = JSON.parse(localStorage.getItem(checkedOptsKey)) //{opt:true/false}
  if (checkedOpts) {
    for (const opt in checkedOpts) {
      document.getElementById(opt).checked = checkedOpts[opt]
    }
    excludeOrIncludeTracks() //to change tracks pool
  } else {
    console.log('Could not get Checked Options from last Session')
    document.getElementById(
      'tracksData'
    ).innerText = `Total Tracks in Queue: ${TRACK_LINKS.length}`
  }

  const link = localStorage.getItem(`LastPlayed: ${MAIN_TITLE}`)
  if (link) {
    console.log('Played from Last Session')
    tracksPlayed.push(TRACK_LINKS.indexOf(link))
    currentTrackPointer = tracksPlayed.length - 1
    playTrack(link)
  } else {
    playNextTrack()
  }

  const skipByOpt = JSON.parse(localStorage.getItem(skipByKey))
  if (skipByOpt) {
    skipByInterval = skipByOpt
  }
  document.getElementById('pickSkipInterval').value = skipByInterval

  const timeOfAudio = localStorage.getItem(lastTimeStampKey)
  if (timeOfAudio) {
    theAudioPlayer.currentTime = timeOfAudio
  }

  if (localStorage.getItem('shuffle') === 'true') toggleShuffle()

  if (localStorage.getItem('showOpts') === 'false') toggleShowingOpts()
}

function getTypeOfTrack(link) {
  let trackType = 'Unable To Get Info'
  const ind = TRACK_LINKS.indexOf(link)
  if (ind > -1) {
    let totalTrack = 0
    for (const opt in ALL_OPTS) {
      if (ALL_OPTS[opt].checked) {
        const len = ALL_OPTS[opt].trackLinks.length
        totalTrack += len
        if (ind <= totalTrack) {
          trackType = opt
          break
        }
      }
    }
  }
  return trackType
}

function toggleDropdown() {
  let x = document.getElementsByClassName('topnav')[0]
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

function put_options() {
  const opts = Object.keys(ALL_OPTS)
  const div_to_put_opts = document.getElementById('tracksOpts')
  for (const title of opts) {
    input = document.createElement('input')
    input.checked = ALL_OPTS[title].checked
    input.type = 'checkbox'
    input.id = title
    input.name = title
    input.onclick = () => excludeOrIncludeTracks()

    label = document.createElement('label')
    label.setAttribute('for', title)
    label.innerText = title

    div_to_put_opts.appendChild(input)
    div_to_put_opts.appendChild(label)
    div_to_put_opts.appendChild(document.createElement('br'))

    TRACK_LINKS.push(...ALL_OPTS[title].trackLinks)
  }
}

function togglePausePlayTrack() {
  const btn = document.getElementById('playPauseBtn')
  if (theAudioPlayer.paused) {
    theAudioPlayer.play()
    btn.src = '/imgs/pause.png'
  } else {
    theAudioPlayer.pause()
    btn.src = '/imgs/play.png'
  }
}

function check_uncheck_opts(val = false) {
  const opts = Object.keys(ALL_OPTS)
  for (const title of opts) {
    input = document.getElementById(title)
    input.checked = val
  }
  excludeOrIncludeTracks()
}

function skipTrackTime(direction) {
  theAudioPlayer.currentTime += parseInt(skipByInterval) * direction
}

function changeInterval() {
  const chosed_skipByOpt = document.getElementById('pickSkipInterval').value
  skipByInterval = chosed_skipByOpt
  localStorage.setItem(skipByKey, chosed_skipByOpt)
}

function global_modal_initialisation() {
  //logic to show and hide modal
  const dialog = document.getElementById('dialog')
  const closeBtn = document.getElementById('closeModal')
  const openBtn = document.getElementById('openModal')

  const openDialog = () => dialog.classList.add('show-dialog')
  const closeDialog = () => dialog.classList.remove('show-dialog')
  closeBtn.addEventListener('click', closeDialog)
  openBtn.addEventListener('click', openDialog)

  window.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog()
  })
}

function add_shabad_from_user_input() {
  const input_tag = document.getElementById('usedShabadId')
  const user_input = input_tag.value
  const list_opts = document.getElementById('shabadId_list_opts')
  list_opts.innerHTML = ''
  if (user_input === '') return

  let max_items_to_show = 10
  const keyObj = findShabadsKey(user_input)
  for (let key in keyObj) {
    const opt = document.createElement('p')
    opt.classList.add('shabad_opt_from_userinput')
    opt.onclick = () => {
      list_opts.innerHTML = ''
      input_tag.value = key
      document.getElementById('theShabadSelected').textContent = keyObj[key]
    }
    // opt.value = key
    opt.innerText = keyObj[key]
    list_opts.appendChild(opt)
    max_items_to_show -= 1
    if (max_items_to_show < 0) break
  }
}

function add_to_form_to_send_to_server(name, value) {
  const form = document.querySelector('#modal-content')
  const additionalField = document.createElement('input')
  additionalField.name = name
  additionalField.value = value
  form.appendChild(additionalField)
  return additionalField
}

function formValidation(e) {
  e.preventDefault()
  const form = document.querySelector('#modal-content')

  const desc = document.querySelector('#userDesc')
  const sbd = document.querySelector('#usedShabadId')
  if (sbd.value === '' && desc.value === '') {
    alert('No Shabad or Description')
    return
  }

  // const itm1 = add_to_form_to_send_to_server('linkToGoTo', 'false')
  add_to_form_to_send_to_server('linkToGoTo', window.location.href)
  add_to_form_to_send_to_server('keertani', currentArtist)
  add_to_form_to_send_to_server('link', currentLink)

  form.submit()
}

function findShabadsKey(searchInput) {
  const all_matched_shabad_keys = {}
  for (const key in ALL_SHABADS) {
    const shabadArray = ALL_SHABADS[key]

    for (const line of shabadArray) {
      const wordsArray = line.split(' ')

      let line_matched = true
      for (let i = 0; i < searchInput.length; i++) {
        if (!line_matched) break
        if (
          wordsArray.length === i ||
          wordsArray[i][0].toLowerCase() !== searchInput[i].toLowerCase()
        ) {
          line_matched = false
        }
      }

      if (line_matched) {
        all_matched_shabad_keys[key] = line
        break
      }
    }
  }
  return all_matched_shabad_keys
}
