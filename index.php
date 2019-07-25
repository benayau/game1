<!DOCTYPE html>

<html>

<head>

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css" integrity="sha256-ANTwsT2Ffs0EVPyOuss4fxYnCxewzdZeahx93/uLWDM=" crossorigin="anonymous" />

	<link href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700" rel="stylesheet">

	<link rel="stylesheet" href="./minicolors.css?v=<?php echo rand();?>">

	<link rel="stylesheet" href="./jquery.toast.css?v=<?php echo rand();?>">

	<link rel="stylesheet" href="./base.css?v=<?php echo rand();?>">

	<link rel="stylesheet" href="./main.css?v=<?php echo rand();?>">

	<title>Allwair.us - DualPlus Client - Shair Rix - Giorgi</title>

	<meta name="Description" content="Allwair.us is the best Private server experience you can have.">

    <meta name="Keywords" content="Private Servers, Allwair.us ,agario, skins, chat, minimap">

    <meta name="robots" content="index, nofollow">

	<script src="//api.adinplay.com/libs/aiptag/pub/PPT/nefllo.io/tag.min.js"></script>

	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

	<script src="https://unpkg.com/popper.js@1/dist/umd/popper.min.js"></script>

	<script src="https://unpkg.com/tippy.js@4"></script>

</head>

<body>

	<div class="hud">

		<div class="leaderboard">

			<span class="leaderboard-header">Leaderboard</span>

			<div class="leaderboard-players"></div>

		</div>

		<div class="status">

			<div class="stats-column">

				<li class="stats-row stats-mass"></li>

				<li class="stats-row stats-score"></li>

				<li class="stats-row stats-fps"></li>

				<li class="stats-row stats-ste"></li>

				<br>

				<li class="stats-row stats-cells small"></li>

				<li class="stats-row stats-playing small"></li>

				<li class="stats-row stats-spectating small"></li>

			</div>

		</div>

		<div id="chatroom"></div>

		<div class="message-menu">

			<div class="chat-emoticons"></div>

			<input id="message-input" class="input" type="text" placeholder="Enter chat message..." maxlength="80">

		</div>

	</div>

	<div class="app" style="display: block;">

		<!--<div id="preroll"></div>-->

		<div class="advertisement top">

		</div>

		<div id="main-content">

			<div class="main-panel side-panel">

				<div class="header">

					<h2>Account</h2>

				</div>

				<div class="account-message">

					<span>We are working on this part of the game, have patience please.</span>

					<div class="spinner">

						<div class="bounce1"></div>

					  	<div class="bounce2"></div>

					  	<div class="bounce3"></div>

					</div>

				</div>	

			</div>

			<div class="main-panel home-panel">

				<div class="nav-top">

	                <a class="nav-button setting">

	                    <i class="fas fa-cog"></i>

	                </a>

	                <a class="nav-button theme">

	                	<i class="fas fa-paint-brush"></i>

	                </a>

	                <a class="nav-button hotkeys">

	                	<i class="fas fa-keyboard"></i>

	                </a>

	                <a class="nav-button info">

	                	<i class="fas fa-info-circle"></i>

	                </a>

    			</div>

    			<!-- arrow - left -->

    			<div class="arrow-left">

    				<i class="fas fa-angle-left"></i>

    			</div>

    			<!-- arrow - right -->

    			<div class="arrow-right">

    				<i class="fas fa-angle-right"></i>

    			</div>

				<!--temp-->

				<div class="bar-circle-outer">

					<div class="bar-circle">

						<div class="skin-preview"></div>

					</div>

				</div>

				<!--temp-->

				<!-- Inputs : tag, nick & skin-url -->

				<div class="player-inputs">

					<div class="form-row">

						<input class="input input-tag" id="tag" name="tag" placeholder="Tag">

						<input class="input input-nickname" id="nickname" name="nickname" placeholder="Nickname">

					</div>

					<div class="form-group">

						<input class="input input-skin-url" id="skin-url" name="skin-url" placeholder="Skin URL ( imgur )">

					</div>

				</div>

				<div class="advert-menu">

					<span>Advertisement</span>

				</div>

				<div class="player-buttons">

					<button class="button play-button">Play <i class="fas fa-play"></i></button>

					<button class="button spectate-button"><i class="fas fa-search"></i></button>

					<button class="button respawn-button"><i class="fas fa-redo"></i></button>

				</div>

			</div>

			<div class="main-panel settings-panel">

    			<div class="nav-top">

    				<h1 class="nav-title">Settings</h1>

    			</div>

    			<button class="close">Close</button>

    			<div class="settings-container">

    				<div class="range-slider">

    					<span class="title">Zoom Speed</span>

    					<input class="range-slider__range" id="opt_zoom_speed" type="range" name="opt_zoom_speed" min="0.70" max="0.99" step="0.01" value="0.9">

    					<span id="txt_zoom_speed" class="range-slider__value">0.9</span>

    				</div>

    				<div class="range-slider">

    					<span class="title">Animation Delay</span>

    					<input class="range-slider__range" id="opt_animation_delay" type="range" name="opt_animation_delay" min="100" max="200" step="1" value="140">

    					<span id="txt_animation_delay" class="range-slider__value">140</span>

    				</div>

    				<div class="settings-columns">

	    				<div class="column first"></div>

	    				<div class="column second"></div>

    				</div>

    			</div>

			</div>

			<div class="main-panel theme-panel">

    			<div class="nav-top">

    				<h1 class="nav-title">Theming</h1>

    			</div>

    			<button class="close">Close</button>

    			<div class="theme-container">

    				<span class="theme-type">GAME</span>

    				<div class="row">

    					<span class="title">Background</span>

    					<input type="text" id="backgroundColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Border</span>

    					<input type="text" id="borderColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Food</span>

    					<input type="text" id="foodColor" class="minicolors minicolors-input">

    				</div>

    				<span class="theme-type">MINIMAP</span>

    				<div class="row">

    					<span class="title">Minimap Team</span>

    					<input type="text" id="minimapTeamColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Minimap Self</span>

    					<input type="text" id="minimapSelfColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Minimap Cell Text</span>

    					<input type="text" id="minimapCellTextColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Minimap Death Location</span>

    					<input type="text" id="minimapLastDeath" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Minimap Guides</span>

    					<input type="text" id="minimapGuides" class="minicolors minicolors-input">

    				</div>

    				<span class="theme-type">SECTORS</span>

    				<div class="row">

    					<span class="title">Grid</span>

    					<input type="text" id="gridColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Sectors Font</span>

    					<input type="text" id="sectorsFontsColor" class="minicolors minicolors-input">

    				</div>

    				<span class="theme-type">NAMES & MASS</span>

    				<div class="row">

    					<span class="title">Names & Mass</span>

    					<input type="text" id="namesColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Names & Mass Stroke</span>

    					<input type="text" id="namesStrokeColor" class="minicolors minicolors-input">

    				</div>

    				<span class="theme-type">VIRUS</span>

    				<div class="row">

    					<span class="title">Virus</span>

    					<input type="text" id="virusColor" class="minicolors minicolors-input">

    				</div>

    				<div class="row">

    					<span class="title">Virus Stroke</span>

    					<input type="text" id="virusStrokeColor" class="minicolors minicolors-input">

    				</div>

    			</div>

			</div>

			<div class="main-panel hotkeys-panel">

    			<div class="nav-top">

    				<h1 class="nav-title">Hotkeys</h1>

    			</div>

    			<button class="close">Close</button>

    			<div class="hotkeys-container">

    				<div id="hotkeysoverlaycontent-2"></div>

    			</div>

    			<div class="hotkeys-buttons">

    				<a onclick="saveHotkeys();"><i class="fas fa-check"></i></a>

    				<a onclick="cancelHotkeys();"><i class="fas fa-times"></i></a>

    				<a onclick="resetDefaultHotkeys();"><i class="fas fa-sync"></i></a>

    			</div>

			</div>

			<div class="main-panel info-panel">

    			<div class="nav-top">

    				<h1 class="nav-title">Info</h1>

    			</div>

    			<button class="close">Close</button>

    			<div class="info-container"></div>

			</div>

			<div class="main-panel side-panel">

				<div class="header">

					<h2>Servers</h2>

				</div>

				<button class="reload-button"><i class="fas fa-redo"></i></button>

				<div class="servers"></div>

				<p class="servers-total">Loading...</p>

			</div>

		</div>

		<!--<div class="advertisement bottom"></div>-->

	</div>

	<canvas id="canvas"></canvas>

	<canvas id="minimapNode"></canvas>

	<canvas id="minimap"></canvas>



	<input class="currentserverurl" style="display:none;">

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.js"></script>

    <script type="text/javascript" src="./minicolors.js?v=<?php echo rand();?>"></script>

	<script type="text/javascript" src="./core.js?v=<?php echo rand();?>"></script>

	<script type="text/javascript" src="./main.js?v=<?php echo rand();?>"></script>

</body>

</html>