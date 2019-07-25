var lastPlayClicked = 0;
var nickname = $('#nickname').val();
window.servermode = null;

function rollAd() {
    if (Date.now() - lastPlayClicked < 1.2e+6) {
        setNick(nickname);
        return;
    }
    adplayer.startPreRoll();
}

function initAipPreroll() {
    if (typeof aipPlayer != "undefined") {
        adplayer = new aipPlayer({
            AD_WIDTH: 920,
            AD_HEIGHT: 570,
            AD_FULLSCREEN: false,
            AD_CENTERPLAYER: true,
            LOADING_TEXT: 'Loading...',
            PREROLL_ELEM: document.getElementById('preroll'),
            AIP_COMPLETE: function() {
                lastPlayClicked = Date.now();
                setNick(nickname);
            },
            AIP_REMOVE: function() {
                //document.getElementById('preroll').remove();
            }
        });
    }
}

function getScript(src, callback) {
    var headElm = document.head || document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    var once = true;
    script.async = "async";
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.src = src;
    script.onload = script.onreadystatechange = function() {
        if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
            once = false;
            callback();
            script.onload = script.onreadystatechange = null;
        }
    };

    headElm.appendChild(script);
}

getScript('//api.adinplay.com/player/v2/PSL/wair.io/player.min.js', initAipPreroll);

function cargarServers() {
    var url = './gameservers.json?v=' + Math.floor(Math.random() * (1E3 * 1E3));
    var loadGameservers = function(response) {
        var gameslistdiv = "";
        var html = "";
        $.each(response.gameservers, function(region, modes) {
            var regiondiv = "<ul>";
            $.each(modes, function(mode, instances) {
                $.each(instances, function(id, websocket) {
                    /*html = $('<ul>').append(
                        $('<li>').addClass('gameinstance' + ' ' + mode).append(
                            $('<button>').addClass('button' + ' ' + websocket).append(
                                $('<span>').addClass('badge server-number').text(id),
                                $('<span>').text(mode),
                                $('<span>').addClass('server-status-players' + ' ' + 'status' + '-' + mode + '-' + id).append(
                                    $('<span>').addClass('playerscount').text('0'),
                                    $('<span>').addClass('playerslimit').text('0')
                                )
                            ).click(() => connector(websocket, mode, id))
                        )
                    );*/
                    var instancediv = "";
                    instancediv += "<li id=" + mode + " class='gameinstance'>";
                    instancediv += "<button class='button' onclick='connector('" + websocket + "')'>";
                    instancediv += "<span class='badge server-number'>" + id + "</span>";
                    instancediv += "<span>" + mode + "</span>";
                    instancediv += "<span class='server-status-players status-" + mode + "-" + id +"'>";
                    instancediv += "<span class='playerscount'>0</span>";
                    instancediv += "<span> / </span>";
                    instancediv += "<span class='playerslimit'>0</span>";
                    instancediv += "</span>";
                    instancediv += "</button>";
                    instancediv += "</li>";
                    regiondiv += instancediv;
                    //$(".button").click(() => connector(websocket, mode, id));
                });
            });
            regiondiv += "</ul>";
            gameslistdiv += regiondiv;
        });
        $(".servers").append(gameslistdiv).hide().fadeIn('fast');
    };
    $.ajax({
        dataType: "json",
        url: url,
        success: loadGameservers
    });
}

function updateServerPlayers() {
    // length of severs
    var size = $('.gameinstance').length;

    // Ultra
    $.getJSON("http://192.99.154.7:555", function(stats) {
        $(".status-Ultra-1 .playerscount").text(stats.current_players);
        $(".status-Ultra-1 .playerslimit").text(stats.max_players);
    });
    $.getJSON("http://192.99.154.7:560", function(stats) {
        $(".status-Ultra-2 .playerscount").text(stats.current_players);
        $(".status-Ultra-2 .playerslimit").text(stats.max_players);
    });
    $.getJSON("http://192.99.154.7:570", function(stats) {
        $(".status-Ultra-3 .playerscount").text(stats.current_players);
        $(".status-Ultra-3 .playerslimit").text(stats.max_players);
    });

    // Crazy
    $.getJSON("http://192.99.154.7:580", function(stats) {
        $(".status-Crazy-1 .playerscount").text(stats.current_players);
        $(".status-Crazy-1 .playerslimit").text(stats.max_players);
    });

    // Instant
    $.getJSON("http://192.99.154.7:590", function(stats) {
        $(".status-Instant-1 .playerscount").text(stats.current_players);
        $(".status-Instant-1 .playerslimit").text(stats.max_players);
    });

    // Selffeed
    $.getJSON("http://192.99.154.7:600", function(stats) {
        $(".status-Selffeed-1 .playerscount").text(stats.current_players);
        $(".status-Selffeed-1 .playerslimit").text(stats.max_players);
    });
    $.getJSON("http://192.99.154.7:610", function(stats) {
        $(".status-Selffeed-2 .playerscount").text(stats.current_players);
        $(".status-Selffeed-2 .playerslimit").text(stats.max_players);
    });

    // Bots
    $.getJSON("http://192.99.154.7:620", function(stats) {
        $(".status-Bots-1 .playerscount").text(stats.current_players);
        $(".status-Bots-1 .playerslimit").text(stats.max_players);
    });

    // variables of servers count
    var server1 = parseInt($(".status-Ultra-1 .playerscount").text());
    var server2 = parseInt($(".status-Ultra-2  .playerscount").text());
    var server3 = parseInt($(".status-Ultra-3  .playerscount").text());
    var server4 = parseInt($(".status-Crazy-1  .playerscount").text());
    var server5 = parseInt($(".status-Instant-1  .playerscount").text());
    var server6 = parseInt($(".status-Selffeed-1  .playerscount").text());
    var server7 = parseInt($(".status-Selffeed-2  .playerscount").text());
    var server8 = parseInt($(".status-Bots-1  .playerscount").text());

    var servers = [
        parseInt($(".status-Ultra-1 .playerscount").text()),

    ];

    // servers players count
    var total = server1 + server2 + server3 + server4 + server5 + server6 + server7 + server8;

    // if ´total´ var is NaN => 0
    if (isNaN(total)) total = 0;

    if (size == 1) {
        $(".servers-total").text(total + " " + "players online in" + " " + size + " " + "server");
    } else if (size > 1 || size == 0) {
        $(".servers-total").text(total + " " + "players online in" + " " + size + " " + "servers");
    }
}

function reloadServers() {
    console.log("Updating servers list..."),
    $(".servers").empty(),
    $(".servers").append(
        '<div class="uKlzOp">' +
        '<span>Loading servers</span>' +
        '<div class="loading loading-lg"></div>' +
        '</div>'
    ),
    $(".uKlzOp").fadeIn(400),
    setTimeout(() => {
        $(".uKlzOp").fadeOut('fast'),
            setTimeout(() => {
                cargarServers();
            }, 100);
    }, 1E3),
    console.log("Servers list has been updated.");
}

function connector(ip, mode, id) {
    connect("ws://" + ip);
    $(".currentserverurl").val(ip);
    window.servermode = mode.toLowerCase();
    $('.gameinstance').click(function() {
        $(this).addClass("connected").siblings().removeClass("connected");
    });
}

function getSkinURL() {
    var profileImageURL = $("#skin-url").val();
    $("#skin-url").change(function() {
        function addGlobalStyle(css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) {
                return;
            }
            style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'profile-css';
            style.innerHTML = css;
            head.appendChild(style);
        }
        addGlobalStyle(".skin-preview { background: url('" + this.value + "'); }");
    });

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'profile-css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    addGlobalStyle(".skin-preview { background: url('" + profileImageURL + "'); }");
};

$(".play-button").click(() => rollAd()), $(".spectate-button").click(() => spectate()), $(".respawn-button").click(() => respawn()), $(".reload-button").click(() => reloadServers()), $("#hotkeys_setting #hotkey_table").appendTo("#hotkeysoverlaycontent-2"), cargarServers(), getSkinURL(),
setInterval(() => {
    $('#Dual .button').replaceWith(
        $('<button>').addClass('button').append(
            $('<span>').addClass('badge server-number').text('1'),
            $('<span>').text('Dual'),
            $('<span>').addClass('server-status-players status-Dual-1').text('0 / 0')
        ).click(() => {
            swal({
                title: "Dual Gamemode",
                text: "This game mode is under developer, be patient please...",
                icon: "error",
                dangerMode: true,
            });
        })
    );
}, 5E3), setInterval(updateServerPlayers, 2E3),
setInterval(() => {
    reloadServers(),
    console.log("updating servers list every 10 minuts...");
}, 10 * 60 * 1000),
setInterval(() => {
    $('.servers ul:not(:last-child)').remove();
}, 10E3);
$('.nav-button.setting').click(() => {
    $('.home-panel').hide(),
    $('.theme-panel').hide(),
    $('.hotkeys-panel').hide(),
    $('.info-panel').hide(),
    $('.main-panel.settings-panel').css('display', 'inline-block');
}),
$('.nav-button.theme').click(() => {
    $('.home-panel').hide(),
    $('.settings-panel').hide(),
    $('.hotkeys-panel').hide(),
    $('.info-panel').hide(),
    $('.main-panel.theme-panel').css('display', 'inline-block');
}),
$('.nav-button.hotkeys').click(() => {
    $('.home-panel').hide(),
    $('.settings-panel').hide(),
    $('.theme-panel').hide(),
    $('.info-panel').hide(),
    $('.main-panel.hotkeys-panel').css('display', 'inline-block');
}),
$('.nav-button.info').click(() => {
    $('.home-panel').hide(),
    $('.settings-panel').hide(),
    $('.theme-panel').hide(),
    $('.hotkeys-panel').hide(),
    $('.main-panel.info-panel').css('display', 'inline-block');
}),
$('.close').click(() => {
    $('.settings-panel, .theme-panel, .hotkeys-panel, .info-panel').hide(),
    $('.home-panel').show();
});
tippy('.spectate-button', {
    content: "Spectate",
    animation: 'scale',
});
tippy('.respawn-button', {
    content: "Respawn",
    animation: 'scale',
});
tippy('.reload-button', {
    content: "Refresh Servers",
    animation: 'scale',
});