document.write('\
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> \
<nav class="topnav"> \
    <a href="/" class="active">Home</a> \
    <div class="dropdown"> \
      <button class="dropbtn"> \
        Keertan \
        <i class="fa fa-caret-down"></i> \
      </button> \
      <div class="dropdown-content"> \
        <a href="/Keertan/AkhandKeertan/">Akhand Keertan</a> \
        <a href="/Keertan/DarbarSahibPuratanKeertanSGPC">Darbar Sahib Puratan Keertan</a> \
        <a href="/Keertan/TimeBasedKeertan(RaagKeertan)">Time Based Keertan (Raag Keertan)</a> \
      </div> \
    </div> \
    <a href="/BhagatJaswantSinghJi/">Bhagat Jaswant Singh Ji</a> \
    <a href="/Paath/">Paath</a> \
    <a href="/PanjGranthi(BhaiJaswantSinghJi)/">Panj Granthi</a> \
    <a href="/SantGianiGurbachanSinghJiSGGSKatha/">Sant Giani Gurbachan Singh Ji SGGS Katha</a> \
    <a \
      href="javascript:void(0);" \
      style="font-size: 15px" \
      class="icon" \
      onclick="toggleDropdown()" \
      >&#9776;</a \
    > \
</nav> \
 \
<body> \
  <h1 id="MainTitle"></h1> \
 \
  <div id="trackPlaying" style="display: none"> \
    <div id="trackInfo"> \
      <h4 id="trackFromWhichOpt"></h4> \
      <h3> \
        <a id="trackNameAtag" target="_blank" rel="noopener noreferrer"></a> \
      </h3> \
      <audio \
        onended="playNextTrack()" \
        onerror="" \
        controls \
        autoplay="true" \
      ></audio> \
    </div> \
    <button class="basicBtn" id="saveTrackBtn">SAVE</button> \
    <div id="trackNavigationBtns"> \
      <button class="basicBtn trackNavBtn" onclick="playPreviousTrack()"> \
        &#8592; Previous \
      </button> \
      <button \
        class="basicBtn trackNavBtn" \
        onclick="playRandTrack()" \
        id="playRandomTrack" \
        autofocus \
      > \
        Random Track \
      </button> \
      <button class="basicBtn trackNavBtn" onclick="playNextTrack()"> \
        Next &rarr; \
      </button> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="optionMenu" class="section"> \
    <button \
      class="basicBtn" \
      id="toggleShowingOpts" \
      onclick="toggleShowingOpts()" \
    > \
      Hide The Options \
    </button> \
    <div class="sectionDisplay"> \
      <div id="tracksOpts"></div> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="forSavedTracks" class="section"> \
    <button class="basicBtn" onclick="toggleSavedTracks()"> \
      Toggle Saved Tracks \
    </button> \
    <div class="sectionDisplay"> \
      <ol id="savedShabads"></ol> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="forSearch" class="section"> \
    <input \
      placeholder="Search for Track:" \
      id="searchInput" \
      oninput="searchForShabad(this.value)" \
    /> \
    <div class="sectionDisplay"> \
      <ol id="searchResults"></ol> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="forShowTracks" class="section"> \
    <button class="basicBtn" onclick="toggleShowingTracks()"> \
      Show Tracks (Toggle) \
    </button> \
    <div class="sectionDisplay"> \
      <div id="showAllTracks"></div> \
    </div> \
  </div> \
 \
  <div id="myModal" class="modal"> \
    <div class="modal-content"> \
      <span class="close">&times;</span> \
      <label for="noteForSavedTrack" \
        >Enter a note if you would like (not needed):</label \
      > \
      <div> \
        <textarea \
          multiline \
          placeholder="ex: Amazing Bani at 10:00" \
          id="noteForSavedTrack" \
        ></textarea> \
      </div> \
      <div> \
        <button class="basicBtn" onclick="saveTrack()">Save</button> \
      </div> \
    </div> \
  </div> \
 \
  <!-- <button onclick="localStorage.clear()">Reset Saved/Local Storage</button> --> \
</body> \
')
