/* =========================================================
 * Shair Rix - Developer Js
 * YT:
 * =========================================================
 * Copyright 2019 JIMMY MORALES.
 * limitations under the License.
 * ========================================================= */

var tagColors;



function MyApp() {

    function enter() {

        return $("#nickname").val(myApp.getName()),

            nodeList[0][1] == myApp.getName() ? false : (nodeList[0][1] = myApp.getName(),

                setLocalStorage("nick", $("#nickname").val()),

                player_profile[selected_profile].name = myApp.getName(), data(), true);

    }

    function fillHSBFields() {

        var v = myApp.getTeamName();

        return $("#tag").val(v), tmpTeamname == v ? false : (setLocalStorage("opt_teamname", v), player_profile[selected_profile].team = v, data(), true);

    }

    function change() {

        setLocalStorage("selected_profile", selected_profile);

        tmpTeamname = myApp.getTeamName();

        $("#nickname").val(player_profile[selected_profile].name);

        $("#tag").val(player_profile[selected_profile].team);

        $("#skin-url").val(player_profile[selected_profile].skinurl).trigger("change");

        if (fillHSBFields()) {

            nodeList[0][1] = myApp.getName();

            setLocalStorage("nick", myApp.getName());

        } else {

            enter();

        }

    }

    function data() {

        setLocalStorage("player_profile", player_profile);

    }

    this.version = "v2.0.0";

    var v = 0.97;

    this.getZoomSpeed = function() {

        return v;

    };

    $.getJSON("leaderboardcolors.json", function(a) {

        tagColors = a.tagcolors

    });

    this.getZoomLimit = function() {

        return 0.05;

    };

    this.isEnableHideFood = this.isEnableGridline = this.isEnableBorder = this.isEnableMapGrid = this.isEnableCursorLine = this.isEnableZoom = this.isStopMovement = this.isShowBallTotal = this.isShowSTE = this.isShowScroll = false;

    this.isEnableShowAllMass = true;

    this.isEnableSimpleDrawing = false;

    this.isEnableAutoStart = true;

    this.isEnableMouseW = false;

    this.isEnableLockZoom = this.isEnableCustomSkin = true;

    this.isEnableAttackRange = false;

    this.isEnableTeammateIndicator = true;

    this.isEnableChatpopup = false;

    this.attackRangeRadius = 655;

    this.cellColor = "";

    this.cellColorAry = "red #76FF03 blue yellow #8207ff #2196F3 ".split(" ");

    this.doubleSpace = this.quickSpace = this.autoW = false;

    this.doubleSpaceCount = this.quickSpaceCount = 0;

    this.lockZoomG;

    this.teammateIndicatorPosition = 40;

    this.teammateIndicatorSize = 50;

    this.teammateIndicatorShowSize = 200;

    this.teammateIndicator;

    this.specTeammate;

    this.isSpecTeammate = false;

    this.massTextSize = 0.8;

    this.isSpectating = false;

    this.isSameColorFood = true;

    this.isEnableSplitInd = this.isShowTextStrokeLine = this.isAutoHideName = this.isAutoHideMass = this.isShowFPS = this.isTransparentCell = false;

    this.isEnableOtherSkinSupport = true;

    this.isShowPacketIO = this.isEnableShareFb = this.isEnableSound = this.isHideSelfName = this.testing = false;



    this.init = function() {

        var c = document.getElementById("canvas");

        c.getContext("2d");

        c.mozOpaque = true;

        window.setLocalStorage = function(key, value) {

            if ("string" == typeof value) {

                localStorage.setItem(key, value);

            } else {

                localStorage.setItem(key, JSON.stringify(value));

            }

        };

        window.getLocalStorage = function(storageKey) {

            return localStorage.getItem(storageKey);

        };

        if (getLocalStorage("selected_profile")) {

            selected_profile = getLocalStorage("selected_profile");

        }

        if (getLocalStorage("player_profile")) {

            player_profile = JSON.parse(getLocalStorage("player_profile"));

        } else {

            if (getLocalStorage("nick")) {

                player_profile[selected_profile].name = getLocalStorage("nick");

            }

            if (getLocalStorage("opt_teamname")) {

                player_profile[selected_profile].team = getLocalStorage("opt_teamname");

            }

            if (getLocalStorage("skin-url")) {

                player_profile[selected_profile].skinurl = getLocalStorage("skin-url");

            }

        }

        c = 0;

        for (; c < player_profile.length; c++) {

            window.postMessage({

                action: Action.IMAGE,

                data: player_profile[c].skinurl

            }, "*");

        }

        $("body").attr("oncontextmenu", "return false;");

        nodeList[0] = ["me", getLocalStorage("nick"), null, null, "yellow"];

        nodeList[1] = ["top1", "", null, null, "white"];

        nodeList[0][8] = Date.now();

        nodeList[1][8] = Date.now();

        chatRoom = new ChatRoom;

        chatRoom.setContainer(".hud");

        chatRoom.createChatBox();

        minimap = new Minimap;

        minimap.createMap(200);

        c = document.createElement("canvas");

        var context = c.getContext("2d");

        context.beginPath();

        context.lineWidth = 30;

        context.moveTo(0, 0);

        context.lineTo(100, 0);

        context.lineTo(50, 50);

        context.closePath();

        context.strokeStyle = "white";

        context.fillStyle = "white";

        context.stroke();

        context.fill();

        this.teammateIndicator = c;

        conn = new Connection;

        conn.connect(); // conn.connect();

    };

    this.newGame = function() {

        isJoinedGame = true;

        myApp.isStopMovement = false;

        myApp.isSpectating = false;

        myApp.cellColor = "";

        myApp.newGameImpl();

        spectateMode = false;

        nodeList[1][2] = null;

        nodeList[1][3] = null;

    };

    this.afterGameLogicLoaded = function() {

        myApp.setupOption();

        myApp.setupHotKey();

        myApp.restoreSetting();

        myApp.setUpHotKeyConfigPage();

        myApp.setupHints();

        myApp.downloadSkin();

        $("#nickname").change(function() {

            enter();

        });

        $("#tag").change(function() {

            fillHSBFields();

        }).focus(function() {

            tmpTeamname = myApp.getTeamName();

        });

        $("#skin-url").change(function() {

            var nv = getLocalStorage("skin-url");

            var v = myApp.getCustomSkinUrl();

            $("#skin-url").val(v);

            if (nv != v) {

                nv = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

                if ("DEFAULT" == v || nv.test(v)) {

                    setLocalStorage("skin-url", v);

                    nodeList[0][5] = v;

                    player_profile[selected_profile].skinurl = myApp.getCustomSkinUrl();

                    data();

                    myApp.changePreviewImage(player_profile[selected_profile].skinurl);

                    if (customSkin[v]) {

                        //myApp.changePreviewImage(customSkin[v].src);

                    } else {

                        skinDownloadQueue.push(v);

                    }

                } else {

                    $("#skin-url").change();

                }

            }

        });

        data();

    };

    this.spectate = function(buffer2) {

        conn.joinRoom(myApp.getRoom());

        if (!(buffer2 && 0 != buffer2.length)) {

            myApp.isSpectating = true;

        }

    };

    this.newGameImpl = function() {

        var e = true;

        var sectors = getCell();

        if (!(sectors && 0 != sectors.length)) {

            e = false;

        }

        if (e) {

            nodeList[0][6] = sectors[0].color;

            conn.joinRoom(myApp.getRoom());

        } else {

            setTimeout(myApp.newGameImpl, 100);

        }

    };

    this.onDead = function() {

        isJoinedGame = false;

        conn.leaveRoom(myApp.getRoom());

    };

    this.afterGameLoaded = function() {

        myApp.isSpectating = false;

        updateLBCount = -1;

        moveTo(null, null);

        myApp.specTeammate = null;

        myApp.isStopMovement = false;

        minimap.setDeadPosition(null);

        conn.joinRoom(myApp.getRoom());

    };

    this.getRoom = function() {

        return "N/A" == myApp.getCurrentPartyCode() ? myApp.getTeamName() + myApp.getCurrentIP() : myApp.getTeamName() + myApp.getCurrentPartyCode();

    };

    this.restoreSetting = function() {

        if (getLocalStorage("opt_teamname")) {

            $("#tag").val(getLocalStorage("opt_teamname"));

        }

        if (getLocalStorage("nick") && "" != getLocalStorage("nick").trim()) {

            $("#nickname").val(getLocalStorage("nick", myApp.getName()));

        } else {

            $("#nickname").val(myApp.getName());

            setLocalStorage("nick", myApp.getName());

        }

        nodeList[0][1] = myApp.getName();

        if (getLocalStorage("opt_zoom_speed")) {

            v = getLocalStorage("opt_zoom_speed");

            $("#opt_zoom_speed").val(v);

            $("#txt_zoom_speed").text(v);

        }

        var n = getLocalStorage("skin-url");

        if (n && "" != n || (setLocalStorage("skin-url", defaultSkin), n = defaultSkin), n && ("" != n && ($("#skin-url").val(getLocalStorage("skin-url")), nodeList[0][5] = n, customSkin[n] ? myApp.changePreviewImage(customSkin[n].src) : skinDownloadQueue.push(getLocalStorage("skin-url")))), getLocalStorage("hotkeyMapping")) {

            hotkeyMapping = JSON.parse(getLocalStorage("hotkeyMapping"));

        } else {

            var unlock;

            for (unlock in hotkeyConfig) {

                if (hotkeyConfig[unlock].defaultHotkey) {

                    if ("" != hotkeyConfig[unlock].defaultHotkey) {

                        hotkeyMapping[hotkeyConfig[unlock].defaultHotkey] = unlock;

                    }

                }

            }

            setLocalStorage("hotkeyMapping", hotkeyMapping);

        }

        if (getLocalStorage("chatCommand")) {

            chatCommand = JSON.parse(getLocalStorage("chatCommand"));

        } else {

            chatCommand = defaultHotkeyMessageSend;

            setLocalStorage("chatCommand", chatCommand);

        }

    };

    this.setupOption = function() {

        var options = {

            opt_self_name: {

                text: "Hide my name",

                "default": true,

                handler: function(token) {

                    myApp.isHideSelfName = token;

                }

            },

            opt_name: {

                text: "Hide Names",

                handler: function(token) {

                    setNames(!token);

                }

            },

            opt_color: {

                text: "Hide blob colors",

                handler: function(token) {

                    setColors(token);

                }

            },

            opt_mass: {

                text: "Show mass",

                "default": true,

                handler: function(token) {

                    setShowMass(token);

                }

            },

            opt_stats: {

                text: "Skip stats",

                disabled: true,

                "default": true,

                handler: function(token) {

                    setSkipStats(token);

                }

            },

            opt_mapgrid: {

                text: "Grid Locations",

                "default": true,

                handler: function(token) {

                    myApp.isEnableMapGrid = token;

                }

            },

            opt_cursorline: {

                text: "Cursor Line",

                "default": true,

                handler: function(token) {

                    myApp.isEnableCursorLine = token;

                }

            },

            opt_zoom: {

                text: "Zoom",

                "default": true,

                handler: function(token) {

                    myApp.isEnableZoom = token;

                }

            },

            opt_food: {

                text: "Hide Pellets",

                handler: function(token) {

                    myApp.isEnableHideFood = token;

                }

            },

            opt_gridline: {

                text: "Gridlines",

                handler: function(token) {

                    myApp.isEnableGridline = token;

                }

            },

            opt_simple_drawing: {

                text: "No Animations",

                "default": true,

                handler: function(token) {

                    myApp.isEnableSimpleDrawing = token;

                }

            },

            opt_score: {

                text: "Score",

                "default": true,

                handler: function(token) {

                    myApp.isShowScroll = token;

                }

            },

            opt_ste: {

                text: "STE",

                "default": true,

                handler: function(token) {

                    myApp.isShowSTE = token;

                }

            },

            opt_ball_total: {

                text: "[n/16]",

                "default": true,

                handler: function(token) {

                    myApp.isShowBallTotal = token;

                }

            },

            opt_minimap: {

                text: "Minimap",

                "default": true,

                handler: function(token) {

                    if (token) {

                        minimap.show();

                    } else {

                        minimap.hide();

                    }

                }

            },

            opt_mousew: {

                text: "Mouse Feed",

                handler: function(token) {

                    myApp.isEnableMouseW = token;

                }

            },

            opt_same_food_color: {

                text: "Rainbow Color",

                handler: function(token) {

                    myApp.isSameColorFood = !token;

                }

            },

            opt_transparent_cell: {

                text: "Transparent Blobs",

                handler: function(token) {

                    myApp.isTransparentCell = token;

                }

            },

            opt_fps: {

                text: "FPS",

                "default": true,

                handler: function(token) {

                    myApp.isShowFPS = token;

                }

            },

            opt_packetIO: {

                text: "Packets I/O",

                disabled: true,

                handler: function(token) {

                    myApp.isShowPacketIO = token;

                }

            },

            opt_auto_hide_mass: {

                text: "Auto Hide Mass",

                "default": true,

                handler: function(token) {

                    myApp.isAutoHideMass = token;

                }

            },

            opt_auto_hide_name: {

                text: "Auto Hide Names",

                "default": true,

                handler: function(token) {

                    myApp.isAutoHideName = token;

                }

            },

            opt_show_text_stroke_line: {

                text: "Text Shadows",

                handler: function(token) {

                    myApp.isShowTextStrokeLine = token;

                }

            },

            opt_lock_zoom: {

                text: "Auto Zoom",

                handler: function(token) {

                    myApp.isEnableLockZoom = !token;

                }

            },

            opt_split_ind: {

                text: "Split Indicators",

                handler: function(token) {

                    myApp.isEnableSplitInd = token;

                }

            },

            opt_custom_skin: {

                text: "Custom Skins",

                "default": true,

                handler: function(token) {

                    myApp.isEnableCustomSkin = token;

                }

            },

            opt_other_skin: {

                text: "Yin Skins",

                disabled: true,

                handler: function(token) {

                    myApp.isEnableOtherSkinSupport = token;

                }

            },

            opt_chatbox: {

                text: "Chatbox",

                disabled: false,

                "default": false,

                handler: function(token) {

                    if (token) {

                        chatRoom.show();

                    } else {

                        chatRoom.hide();

                    }

                }

            },

            opt_chatpopup: {

                text: "Chat Popup",

                disabled: false,

                "default": true,

                handler: function(token) {

                    myApp.isEnableChatpopup = token;

                }

            }

        };

        window.setYinSkinSupport = function(firstRestricted) {

            options.opt_other_skin.handler(firstRestricted);

            setLocalStorage("opt_other_skin", firstRestricted);

        };

        var i;

        var row = [];

        for (i in options) {

            if (!options[i].disabled) {

                row.push('<input id="' + i + '" type="checkbox"> ' + options[i].text + "<br>");

            }

        }

        var d = row.splice(0, 13);

        var j = 0;

        for (; j < d.length; j++) {

            $(".firstSettings").append(d[j]);

        }

        j = 0;

        for (; j < row.length; j++) {

            $(".secondSettings").append(row[j]);

        }

        $("input:checkbox").change(function() {

            var firstRestricted = $(this).prop("checked");

            var type = $(this).prop("id");

            setLocalStorage(type, firstRestricted);

            if (options[type]) {

                options[type].handler(firstRestricted);

            }

        });

        for (i in options) {

            if (getLocalStorage(i)) {

                if ("true" == getLocalStorage(i)) {

                    if ("opt_other_skin" == i) {

                        setYinSkinSupport(true);

                    } else {

                        $("#" + i).click();

                    }

                }

            } else {

                if (options[i]["default"]) {

                    $("#" + i).click();

                }

            }

        }

        $(".zoomSpeed").append('Zoom Speed: <span id="txt_zoom_speed">0.97</span></div><input oninput="$(\'#txt_zoom_speed\').text(this.value);" style="width:100%;" type="range" id="opt_zoom_speed" name="opt_zoom_speed" min="0.70" max="0.99" step="0.01" value="0.9">');

        $("#opt_zoom_speed").change(function() {

            v = $("#opt_zoom_speed").val();

            setLocalStorage("opt_zoom_speed", v);

        });

    };

    this.scoreInfo = function(millis) {

        if (!millis || !millis.length) {

            return "";

        }

        var optsData = "";

        return myApp.isShowSTE && (optsData += "   STE: " + this.getSTE(millis)), myApp.isShowBallTotal && (optsData += "   [" + millis.length + "/16]"), optsData;

    };

    this.scoreTxt = function(dataAndEvents) {

        return myApp.isShowScroll ? dataAndEvents : "";

    };

    this.isShowScoreInfo = function() {

        return myApp.isShowScroll || (myApp.isShowSTE || myApp.isShowBallTotal);

    };

    this.showSystemMessage = function() {

        return false;

    };

    this.getSTE = function(codeSegments) {

        var w = 0;

        var i = 0;

        for (; i < codeSegments.length; i++) {

            if (codeSegments[i]) {

                if (codeSegments[i].I) {

                    if (codeSegments[i].I.w) {

                        if (codeSegments[i].I.w > w) {

                            w = codeSegments[i].I.w;

                        }

                    }

                }

            }

        }

        return ~~(0.375 * w);

    };

    this.updateLBInfo = function() {

        var escaped = "";

        var codeSegments = myApp.getLeaderBoard();

        if (codeSegments) {

            var i = 0;

            for (; i < codeSegments.length; i++) {

                escaped += "<div>" + (i + 1) + ".  " + escapeHtml(codeSegments[i]) + "</div>";

            }

        }

        $("#lb_info").html(escaped);

    };

    this.isPrivateServer = function() {

        return PRIVATE_SERVER_IP == currentIP;

    };

    this.getCurrentIP = function() {

        return this.isPrivateServer() ? "----------" : currentIP.substring(5, currentIP.length);

    };

    this.getTeamName = function() {

        return ("" == $("#tag").val() ? "" : $("#tag").val()).trim();

    };

    this.getCustomSkinUrl = function() {

        var ret = ($("#skin-url").val() + "").trim();

        return "" == ret ? "" : ret;

    };

    this.getCurrentPartyCode = function() {

        return $(".partyToken").val();

    };

    this.getName = function() {

        var val = $("#nickname").val().trim();

        return -1 != val.indexOf("\u200b") && (val = ""), "" == val ? "" : val;

    };

    this.getLeaderBoard = function() {

        var listenersArr = [];

        var codeSegments = getLB();

        if (codeSegments) {

            var i = 0;

            for (; i < codeSegments.length; i++) {

                listenersArr[listenersArr.length] = "" == codeSegments[i].name ? "An unnamed cell" : escapeHtml(codeSegments[i].name);

            }

        }

        return listenersArr;

    };

    this.setupHotKey = function() {

        hotkeyConfig = {

            hk_start_new_game: {

                defaultHotkey: "N",

                name: "Start new game",

                keyDown: function() {

                    connect($("#chooseServer").val()); // establece el servidor al que nos conectaremos

                    setNick(myApp.getName());

                },

                type: "NORMAL"

            },

            hk_cheatw: {

                defaultHotkey: "E",

                name: "Macro W",

                keyDown: function() {

                    myApp.autoW = true;

                    handleQuickW();

                },

                keyUp: function() {

                    myApp.autoW = false;

                },

                type: "NORMAL"

            },

            hk_quick_space: {

                defaultHotkey: "T",

                name: "Quick space",

                keyDown: function() {

                    if (!myApp.quickSpace) {

                        myApp.quickSpace = true;

                        quickSpace();

                    }

                },

                keyUp: function() {

                    myApp.quickSpace = false;

                },

                type: "NORMAL"

            },

            hk_double_space: {

                defaultHotkey: "G",

                name: "Double space",

                keyDown: function() {

                    if (!myApp.doubleSpace) {

                        myApp.doubleSpace = true;

                        doubleSpace();

                    }

                },

                keyUp: function() {

                    myApp.doubleSpace = false;

                },

                type: "NORMAL"

            },

            hk_stop_movement_toggle: {

                defaultHotkey: "ALT_S",

                name: "Stop movement (Toggle)",

                keyDown: function() {

                    myApp.isStopMovement = !myApp.isStopMovement;

                    myApp.specTeammate = null;

                },

                type: "NORMAL"

            },

            hk_stop_movement: {

                defaultHotkey: "S",

                name: "Stop movement (Temporary)",

                keyDown: function() {

                    myApp.isStopMovement = true;

                    myApp.specTeammate = null;

                    moveTo(null, null);

                },

                keyUp: function() {

                    myApp.isStopMovement = false;

                },

                type: "NORMAL"

            },

            hk_split_ind: {

                defaultHotkey: "I",

                name: "On/ off split indicator",

                keyDown: function() {

                    $("#opt_split_ind").click();

                },

                type: "NORMAL"

            },

            hk_lock_zoom: {

                defaultHotkey: "L",

                name: "On/ off auto zoom",

                keyDown: function() {

                    $("#opt_lock_zoom").click();

                },

                type: "NORMAL"

            },

            hk_attack_range: {

                defaultHotkey: "A",

                name: "Show attack range (Temporary)",

                keyDown: function() {

                    myApp.isEnableAttackRange = true;

                },

                keyUp: function() {

                    myApp.isEnableAttackRange = false;

                },

                type: "NORMAL"

            },

            hk_attack_range_toggle: {

                defaultHotkey: "ALT_A",

                name: "Show attack range (Toggle)",

                keyDown: function() {

                    myApp.isEnableAttackRange = !myApp.isEnableAttackRange;

                },

                type: "NORMAL"

            },

            hk_spec_teammate: {

                defaultHotkey: "V",

                name: "Spectating teammate",

                keyDown: function() {},

                type: "NORMAL"

            },

            hk_custom_skin: {

                defaultHotkey: "",

                name: "On/ off Custom skin",

                keyDown: function() {

                    $("#opt_custom_skin").click();

                },

                type: "NORMAL"

            },

            hk_skin: {

                defaultHotkey: "",

                name: "Show/ hide skins",

                keyDown: function() {

                    $("#opt_skin").click();

                },

                type: "NORMAL"

            },

            hk_same_food_color: {

                defaultHotkey: "",

                name: "On/ off Rainbow color",

                keyDown: function() {

                    $("#opt_same_food_color").click();

                },

                type: "NORMAL"

            },

            hk_transparent_cell: {

                defaultHotkey: "",

                name: "On/ off transparent cell",

                keyDown: function() {

                    $("#opt_transparent_cell").click();

                },

                type: "NORMAL"

            },

            hk_fps: {

                defaultHotkey: "",

                name: "Show/ Hide FPS counter",

                keyDown: function() {

                    $("#opt_fps").click();

                },

                type: "NORMAL"

            },

            hk_zoom_a: {

                defaultHotkey: "1",

                name: "Zoom level 1",

                keyDown: function() {

                    if (!myApp.isEnableLockZoom) {

                        hotkeyConfig.hk_lock_zoom.keyDown();

                    }

                    setZoomLevel(0.75);

                },

                type: "NORMAL"

            },

            hk_zoom_b: {

                defaultHotkey: "2",

                name: "Zoom level 2",

                keyDown: function() {

                    if (!myApp.isEnableLockZoom) {

                        hotkeyConfig.hk_lock_zoom.keyDown();

                    }

                    setZoomLevel(0.3);

                },

                type: "NORMAL"

            },

            hk_zoom_c: {

                defaultHotkey: "3",

                name: "Zoom level 3",

                keyDown: function() {

                    if (!myApp.isEnableLockZoom) {

                        hotkeyConfig.hk_lock_zoom.keyDown();

                    }

                    setZoomLevel(0.15);

                },

                type: "NORMAL"

            },

            hk_zoom_d: {

                defaultHotkey: "4",

                name: "Zoom level 4",

                keyDown: function() {

                    if (!myApp.isEnableLockZoom) {

                        hotkeyConfig.hk_lock_zoom.keyDown();

                    }

                    setZoomLevel(0.08);

                },

                type: "NORMAL"

            },

            hk_zoom_e: {

                defaultHotkey: "5",

                name: "Zoom level 5",

                keyDown: function() {

                    if (!myApp.isEnableLockZoom) {

                        hotkeyConfig.hk_lock_zoom.keyDown();

                    }

                    setZoomLevel(0.05);

                },

                type: "NORMAL"

            },

            hk_name: {

                defaultHotkey: "ALT_N",

                name: "Show/ hide names",

                keyDown: function() {

                    $("#opt_name").click();

                },

                type: "NORMAL"

            },

            hk_self_name: {

                defaultHotkey: "",

                name: "Show/ hide own name",

                keyDown: function() {

                    $("#opt_self_name").click();

                },

                type: "NORMAL"

            },

            hk_color: {

                defaultHotkey: "",

                name: "Show/ hide colors",

                keyDown: function() {

                    $("#opt_color").click();

                },

                type: "NORMAL"

            },

            hk_mass: {

                defaultHotkey: "",

                name: "Show/ hide mass",

                keyDown: function() {

                    $("#opt_mass").click();

                },

                type: "NORMAL"

            },

            hk_stat: {

                defaultHotkey: "",

                name: "On/ off Skip stats",

                keyDown: function() {

                    $("#opt_stats").click();

                },

                type: "NORMAL"

            },

            hk_zoom: {

                defaultHotkey: "ALT_Z",

                name: "On/ off Zoom",

                keyDown: function() {

                    $("#opt_zoom").click();

                },

                type: "NORMAL"

            },

            hk_food: {

                defaultHotkey: "F",

                name: "Show/ hide Pellets",

                keyDown: function() {

                    $("#opt_food").click();

                },

                type: "NORMAL"

            },

            hk_gridline: {

                defaultHotkey: "ALT_G",

                name: "Show/ hide Gridline",

                keyDown: function() {

                    $("#opt_gridline").click();

                },

                type: "NORMAL"

            },

            hk_border: {

                defaultHotkey: "B",

                name: "Reset Border",

                keyDown: function() {},

                type: "NORMAL"

            },

            hk_simple_draw: {

                defaultHotkey: "",

                name: "On/ off Simple draw",

                keyDown: function() {

                    $("#opt_simple_drawing").click();

                },

                type: "NORMAL"

            },

            hk_score: {

                defaultHotkey: "",

                name: "Show/ hide Score",

                keyDown: function() {

                    $("#opt_score").click();

                },

                type: "NORMAL"

            },

            hk_ste: {

                defaultHotkey: "",

                name: "Show/ hide STE",

                keyDown: function() {

                    $("#opt_ste").click();

                },

                type: "NORMAL"

            },

            hk_n16: {

                defaultHotkey: "",

                name: "Show/ hide [n/16]",

                keyDown: function() {

                    $("#opt_ball_total").click();

                },

                type: "NORMAL"

            },

            hk_auto_hide_mass: {

                defaultHotkey: "",

                name: "On/ off Auto hide mass",

                keyDown: function() {

                    $("#opt_auto_hide_mass").click();

                },

                type: "NORMAL"

            },

            hk_auto_hide_name: {

                defaultHotkey: "",

                name: "On/ off Auto hide name",

                keyDown: function() {

                    $("#opt_auto_hide_name").click();

                },

                type: "NORMAL"

            },

            hk_show_text_stroke_line: {

                defaultHotkey: "",

                name: "Show/ hide Text shadow",

                keyDown: function() {

                    $("#opt_show_text_stroke_line").click();

                },

                type: "NORMAL"

            },

            hk_minimap: {

                defaultHotkey: "ALT_M",

                name: "Show/ hide Minimap",

                keyDown: function() {

                    $("#opt_minimap").click();

                },

                type: "NORMAL"

            },

            hk_mousew: {

                defaultHotkey: "",

                name: "On/ off Mouse W",

                keyDown: function() {

                    $("#opt_mousew").click();

                },

                type: "NORMAL"

            },

            hk_send_msg: {

                defaultHotkey: "ENTER",

                name: "Chatbox send message",

                keyDown: function() {

                    chatRoom.enter();

                },

                type: "NORMAL"

            },

            hk_send_msg1: {

                defaultHotkey: "ALT_1",

                name: "Chatbox send message 1",

                keyDown: function() {

                    console.log("CHAT MESSAGE");

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg1);

                },

                type: "TEXT"

            },

            hk_send_msg2: {

                defaultHotkey: "ALT_2",

                name: "Chatbox send message 2",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg2);

                },

                type: "TEXT"

            },

            hk_send_msg3: {

                defaultHotkey: "ALT_3",

                name: "Chatbox send message 3",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg3);

                },

                type: "TEXT"

            },

            hk_send_msg4: {

                defaultHotkey: "ALT_4",

                name: "Chatbox send message 4",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg4);

                },

                type: "TEXT"

            },

            hk_send_msg5: {

                defaultHotkey: "ALT_5",

                name: "Chatbox send message 5",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg5);

                },

                type: "TEXT"

            },

            hk_send_msg6: {

                defaultHotkey: "ALT_6",

                name: "Chatbox send message 6",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg6);

                },

                type: "TEXT"

            },

            hk_send_msg7: {

                defaultHotkey: "ALT_7",

                name: "Chatbox send message 7",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg7);

                },

                type: "TEXT"

            },

            hk_send_msg8: {

                defaultHotkey: "ALT_8",

                name: "Chatbox send message 8",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg8);

                },

                type: "TEXT"

            },

            hk_send_msg9: {

                defaultHotkey: "ALT_9",

                name: "Chatbox send message 9",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg9);

                },

                type: "TEXT"

            },

            hk_send_msg10: {

                defaultHotkey: "ALT_0",

                name: "Chatbox send message 10",

                keyDown: function() {

                    chatRoom.sendMessage(chatCommand.input_hk_send_msg10);

                },

                type: "TEXT"

            }

        };

    };

    this.createMessageDialog = function() {

        var $message;

        var $text;

        $text = $("<div class='modal-footer'>");

        $text.append("<button type='button' class='btn btn-default' data-dismiss='modal'>OK</button>");

        $message = $("<div class='modal-content'/>");

        $message.append($("<div class='modal-header'/>").append("<button type='button' class='close' data-dismiss='modal'>&times;</button><h4 id='message_dialog_title' class='modal-title'></h4>"));

        $message.append($("<div id='message_dialog_content' class='modal-body'>"));

        $message.append($text);

        $message = $("<div id='message_dialog' class='modal fade' role='dialog'/>").append("<div class='modal-dialog'/>").append($message);

        $("body").append($message);

        $("#message_dialog").modal({

            backdrop: "static",

            keyboard: false

        });

        $(document).on("shown.bs.modal", "#message_dialog", function() {

            var a = $("#message_dialog>.modal-content").outerHeight();

            var b = $(document).outerHeight();

            if (a > b) {

                $("#message_dialog").css("overflow", "auto");

            } else {

                $("#message_dialog").css("margin-top", b / 2 - a / 2 - 40);

            }

        });

        $(document).on("hide.bs.modal", "#message_dialog", function() {});

    };

    this.setUpHotKeyConfigPage = function() {

        var body;

        var $rootElement;

        $rootElement = $('<div class="modal-footer" style="background: #222;">');

        $rootElement.append("<button onclick='resetDefaultHotkey();' type='button' class='btn btn-blue' style='float:left;'>Reset to Default</button>");

        $rootElement.append("<button type='button' class='btn btn-red' data-dismiss='modal'>Cancel</button>");

        $rootElement.append("<button id='btn_save_hotkey' onclick='saveHotkeys();' type='button' class='btn btn-green' data-dismiss='modal'>Save</button>");

        body = $("<div class='modal-content' style='background: #222;'/>");

        body.append($("<div class='modal-header'/>").append("<button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Hotkey Setup</h4>"));

        body.append($("<div id='hotkey_modal_body' class='modal-body'>").append(myApp.getHotkeyDivHtml()));

        body.append($rootElement);

        body = $("<div id='hotkeys_setting' class='modal fade' role='dialog'/>").append("<div class='modal-dialog'/>").append(body);

        $("body").append(body);

        $(document).on("hide.bs.modal", "#hotkeys_setting", function() {

            if (selectedHotkeyRow) {

                selectedHotkeyRow.removeClass("table-row-selected");

            }

            selectedHotkeyRow = null;

            myApp.refreshHotkeySettingPage();

        });

        $("#hotkey_table .row").not(".header").click(function() {

            if (selectedHotkeyRow) {

                selectedHotkeyRow.removeClass("table-row-selected");

            }

            selectedHotkeyRow = $(this);

            selectedHotkeyRow.addClass("table-row-selected");

        });

    };

    window.saveHotkeys = function() {

        var codeSegments = $(".hotkey");

        hotkeyMapping = {};

        var i = 0;

        for (; i < codeSegments.length; i++) {

            hotkeyMapping[$(codeSegments[i]).text()] = $(codeSegments[i]).attr("data-hotkeyid");

        }

        setLocalStorage("hotkeyMapping", hotkeyMapping);

        var guid;

        for (guid in chatCommand) {

            chatCommand[guid] = $("#" + guid).val();

        }

        setLocalStorage("chatCommand", chatCommand);

    };

    this.copyGameInfo = function() {

        var failuresLink;

        failuresLink = "Current IP = " + myApp.getCurrentIP();

        failuresLink += "\nRegion : " + $("#region option:selected").text().split(" ")[0];

        failuresLink += "\nGame mode : " + $("#gamemode option:selected").text();

        failuresLink += "\nParty Code : " + myApp.getCurrentPartyCode();

        var codeSegments = myApp.getLeaderBoard();

        if (codeSegments && 0 != codeSegments.length) {

            var i = 0;

            for (; i < codeSegments.length; i++) {

                failuresLink += "\n" + (i + 1) + ".  " + codeSegments[i];

            }

        }

        copyToClipboard(failuresLink);

    };

    window.resetDefaultHotkey = function() {

        var e;

        e = hotkeyMapping;

        defaultHotkeyMapping = {};

        var unlock;

        for (unlock in hotkeyConfig) {

            if (hotkeyConfig[unlock].defaultHotkey) {

                if ("" != hotkeyConfig[unlock].defaultHotkey) {

                    defaultHotkeyMapping[hotkeyConfig[unlock].defaultHotkey] = unlock;

                }

            }

        }

        hotkeyMapping = defaultHotkeyMapping;

        myApp.refreshHotkeySettingPage();

        hotkeyMapping = e;

        defaultHotkeyMapping = null;

        var val;

        for (val in defaultHotkeyMessageSend) {

            $("#" + val).val(defaultHotkeyMessageSend[val]);

        }

    };

    this.refreshHotkeySettingPage = function() {

        var codeSegments = $(".hotkey");

        var i = 0;

        for (; i < codeSegments.length; i++) {

            $(codeSegments[i]).text(" ");

        }

        var version;

        for (version in hotkeyMapping) {

            $("[data-hotkeyid=" + hotkeyMapping[version] + "]").text(version);

        }

        var val;

        for (val in chatCommand) {

            $("#" + val).val(chatCommand[val]);

        }

    };

    this.getHotkeyDivHtml = function() {

        var html = "";

        var fragment = $("<div id='hotkey_setting'></div>");

        var rendered = $("<div id='hotkey_table' class='table'></div>");

        var $message = $("<div class='row header'></div>");

        $message.append($("<div class='cell' style='width:170px;'>Hotkey</div>"));

        $message.append($("<div class='cell' style='width:222px;'>Function</div>"));

        $message.append($("<div class='cell'>Message</div>"));

        rendered.append($message);

        $message = null;

        var type;

        for (type in hotkeyConfig) {

            $message = $("<div class='row'></div>");

            $message.append($("<div data-hotkeyId='" + type + "' class='cell hotkey'>" + getHotkeyById(type) + "</div>"));

            $message.append($("<div class='cell'>" + hotkeyConfig[type].name + "</div>"));

            if ("TEXT" == hotkeyConfig[type].type) {

                $message.append($("<div class='cell'><input id='input_" + type + "' maxlength='200' style='width:100%;color:black;' type='text' value='" + chatCommand["input_" + type] + "'></input></div>"));

            } else {

                $message.append($("<div class='cell'> / </div>"));

            }

            rendered.append($message);

        }

        return fragment.append(rendered), html += $("<p>Step 1: Click on the function item</p>")[0].outerHTML, html += $("<p>Step 2: Press wanted hotkey to modify</p>")[0].outerHTML, html += $("<p>Press [DEL] key to remove selected hotkey</p>")[0].outerHTML, html += $("<p>Allowed hotkey combinations: [CTRL] + [ALT] + 0-9, a-z, [TAB], [ENTER]</p>")[0].outerHTML, html += $("<br></br>")[0].outerHTML, html += fragment[0].outerHTML, $("<div/>").append(html).html();

    };

    this.showAnnouncement = function() {};

    this.setupHints = function() {};

    this.setupHintsImpl = function(node, newValue) {

        node.addClass("hint--bottom hint--rounded");

        node.attr("data-hint", newValue);

    };

    this.ajax = function(url, options, callback, uri) {

        uri = null;

        var request;

        try {

            request = new XMLHttpRequest;

        } catch (a) {

            try {

                request = new ActiveXObject("Msxml2.XMLHTTP");

            } catch (s) {

                try {

                    request = new ActiveXObject("Microsoft.XMLHTTP");

                } catch (l) {

                    return alert("Your browser does not support Ajax."), false;

                }

            }

        }

        return request.onreadystatechange = function() {

            if (4 == request.readyState) {

                callback(request);

            }

        }, request.open(options, url, true), request.send(uri), request;

    };

    this.getSkinImage = function(t) {

        return t && "" != t ? customSkin[t] ? customSkin[t] : (-1 == skinDownloadQueue.indexOf(t) && skinDownloadQueue.push(t), null) : null;

    };

    this.downloadSkin = function() {

        if (0 != skinDownloadQueue.length) {

            var task = skinDownloadQueue.shift();

            if (!customSkin[task]) {

                if (skinDownloadFail[task] && 5 < skinDownloadFail[task]) {

                    if (myApp.getCustomSkinUrl() === task) {

                        //$("#skin_url").val("").trigger("change"); 

                        //así está en alis

                    }

                } else {

                    window.postMessage({

                        action: Action.IMAGE,

                        data: task

                    }, "*");

                }

            }

        }

        setTimeout(myApp.downloadSkin, 2E3);

    };

    this.changePreviewImage = function(url) {

        //alert("Hola");

        $("#preview-img").fadeOut(315, function() {

            $(this).attr("src", url).bind("onreadystatechange load", function() {

                if (this.complete) {

                    $(this).fadeIn(315);

                }

            });

        });

    };

}



function ChatRoom() {

    this.container = "";

    this.isShow = true;

    this.lastMsg = "";

    this.width = 340;

    this.height = 350;

    var _this = this;

    var t = 0;

    this.createChatBox = function() {

        $(this.container).append("<div id='chatroom'></div>");

        $(".hud").append("<div id='chatboxArea2'><input id='input_box2' type='text'></input></div>");

        this.hide();

        $("#chatboxArea2").hide();

        $("#chatroom").mouseup(function() {

            _this.resize();

        });

    };

    _this.resize = function() {

        if ($("#chatroom").width() != this.width || $("#chatroom").height() != this.height) {

            if ($("#chatroom").perfectScrollbar) {

                $("#chatroom").perfectScrollbar("update");

            }

        }

    };

    this.setContainer = function(container) {

        this.container = container;

    };

    this.sendMessage = function(msg) {

        if (msg = msg.trim()) {

            if (!(2E3 > Date.now() - t && 50 > msg.length)) {

                conn.sendMessage({

                    sender: myApp.getName(),

                    msg: msg

                });

                this.lastMsg = msg;

                t = Date.now();

            }

        }

    };

    this.enter = function() {

        if (this.isFocus()) {

            this.sendMessage($("#input_box2").val());

            $("#input_box2").val("");

            $("#input_box2").blur();

            $("#chatboxArea2").hide();

        } else {

            this.focus();

        }

    };

    this.popup = function(callback) {

        if (myApp.isEnableChatpopup) {

            if (!this.isShow) {

                if ($.toast) {

                    $.toast(callback);

                } else {

                    toastQueue.push(callback);

                }

            }

        }

    };

    this.popupInfo = function(text) {

        this.popup({

            text: escapeHtml(text),

            showHideTransition: "slide",

            icon: "info",

            bgColor: "rgba(10, 10, 10, 0.8)",

            allowToastClose: false,

            hideAfter: 15E3,

            stack: 10

        });

    };

    this.popupWarning = function(text) {

        this.popup({

            text: escapeHtml(text),

            showHideTransition: "slide",

            icon: "warning",

            bgColor: "rgba(10, 10, 10, 0.8)",

            allowToastClose: false,

            hideAfter: 15E3,

            stack: 10

        });

    };

    this.popupChat = function(data, msg) {

        var html = escapeHtml(data);

        var replaceHKGIcon = this.replaceHKGIcon(escapeHtml(msg));

        if ("\u4e0d\u7559\u540d [slick]" == data) {

            html = this.replaceHKGIcon(html);

        }

        this.popup({

            heading: '<span class="toast_sender">' + html + ": </span>",

            text: '<span class="toast_chatmsg">' + replaceHKGIcon + "</span>",

            showHideTransition: "fade",

            bgColor: "rgba(10, 10, 10, 0.8)",

            allowToastClose: false,

            hideAfter: 15E3,

            stack: 10

        });

    };

    this.showSystemMessage = function(m1) {

        this.showSystemMessageImpl(m1);

        this.popupInfo(m1);

    };

    this.showSystemWarning = function(m1) {

        this.showSystemMessageImpl(m1);

        this.popupWarning(m1);

    };

    this.showSystemMessageImpl = function(num) {

        if (myApp.showSystemMessage()) {

            $("#chatroom").append($("<div/>").append($("<span class='system'/>").text(this.getTimeStr() + num)));

            this.scrollDown();

        }

    };

    this.getTimeStr = function() {

        var now = new Date;

        var index = now.getMinutes();

        return index = 10 > index ? "0" + index : index, now.getHours() + ":" + index + " ";

    };

    this.receiveMessage = function(msg, message) {

        var tabContent = $("<div/>");

        var errors = $("<span class='time'>").text(this.getTimeStr());

        var size = $("<span class='sender'>").text(msg + " : ");

        if ("\u4e0d\u7559\u540d [slick]" == msg) {

            size.html(this.replaceHKGIcon(size.html()));

        }

        tabContent.append(errors);

        tabContent.append(size);

        errors = $("<span class='msg'>").text(message);

        errors.html(this.replaceHKGIcon(errors.html()));

        tabContent.append(errors);

        $("#chatroom").append(tabContent);

        this.scrollDown();

        this.popupChat(msg, message);

    };

    this.replaceHKGIcon = function(xhtml) {

        var query;

        for (query in hkgIcon) {

            xhtml = xhtml.replace(new RegExp(escapeRegex(query), "g"), '<img alt="$1" src="' + hkgIcon[query] + '">');

        }

        var images = $('img[alt="$1"]');

        var i = 0;

        for (; i < images.length; i++) {

            for (query in hkgIcon) {

                if (images[i].src == hkgIcon[query]) {

                    $(images[i]).attr("alt", query);

                    break;

                }

            }

        }

        return xhtml;

    };

    this.scrollDown = function() {

        if ($("#chatroom").perfectScrollbar) {

            $("#chatroom").scrollTop($("#chatroom").prop("scrollHeight"));

            $("#chatroom").perfectScrollbar("update");

        }

    };

    this.show = function() {

        $("#chatroom").show();

        this.isShow = true;

        this.scrollDown();

    };

    this.hide = function() {

        $("#chatroom").hide();

        this.isShow = false;

    };

    this.isFocus = function() {

        return $("#input_box2").is(":focus");

    };

    this.focus = function() {

        $("#chatboxArea2").show();

        $("#input_box2").focus();

    };

    this.createScrollBar = function() {

        $("#chatroom").perfectScrollbar({

            minScrollbarLength: 50,

            suppressScrollX: false

        });

    };

}



function Minimap() {

    var canvas;

    var ctx;

    var options;

    var context;

    var w = 200;

    var h = 200;

    var s = false;

    var frequency = 1E3 / 30; // Frecuencia del minimapa

    var v = {};

    this.createMap = function(s) {

        if (s) {

            w = h = s;

        }

        $("body").append("<canvas id='minimapNode'>");

        $("body").append("<canvas id='minimap' >");

        canvas = document.getElementById("minimap");

        ctx = canvas.getContext("2d");

        canvas.width = w;

        canvas.height = h;

        ctx.scale(1, 1);

        ctx.strokeStyle = "#333";

        ctx.fillStyle = "#000000";

        ctx.globalAlpha = 0.5;

        ctx.lineWidth = 2;

        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.globalAlpha = 0.2;

        ctx.font = "18px Verdana";

        ctx.fillStyle = "#FFFFFF";

        ctx.fillText("A1", w / 5 / 2, h / 5 / 2);

        ctx.fillText("A2", w / 5 / 2 * 3, h / 5 / 2);

        ctx.fillText("A3", w / 5 / 2 * 5, h / 5 / 2);

        ctx.fillText("A4", w / 5 / 2 * 7, h / 5 / 2);

        ctx.fillText("A5", w / 5 / 2 * 9, h / 5 / 2);

        ctx.fillText("B1", w / 5 / 2, h / 5 / 2 * 3);

        ctx.fillText("B2", w / 5 / 2 * 3, h / 5 / 2 * 3);

        ctx.fillText("B3", w / 5 / 2 * 5, h / 5 / 2 * 3);

        ctx.fillText("B4", w / 5 / 2 * 7, h / 5 / 2 * 3);

        ctx.fillText("B5", w / 5 / 2 * 9, h / 5 / 2 * 3);

        ctx.fillText("C1", w / 5 / 2, h / 5 / 2 * 5);

        ctx.fillText("C2", w / 5 / 2 * 3, h / 5 / 2 * 5);

        ctx.fillText("C3", w / 5 / 2 * 5, h / 5 / 2 * 5);

        ctx.fillText("C4", w / 5 / 2 * 7, h / 5 / 2 * 5);

        ctx.fillText("C5", w / 5 / 2 * 9, h / 5 / 2 * 5);

        ctx.fillText("D1", w / 5 / 2, h / 5 / 2 * 7);

        ctx.fillText("D2", w / 5 / 2 * 3, h / 5 / 2 * 7);

        ctx.fillText("D3", w / 5 / 2 * 5, h / 5 / 2 * 7);

        ctx.fillText("D4", w / 5 / 2 * 7, h / 5 / 2 * 7);

        ctx.fillText("D5", w / 5 / 2 * 9, h / 5 / 2 * 7);

        ctx.fillText("E1", w / 5 / 2, h / 5 / 2 * 9);

        ctx.fillText("E2", w / 5 / 2 * 3, h / 5 / 2 * 9);

        ctx.fillText("E3", w / 5 / 2 * 5, h / 5 / 2 * 9);

        ctx.fillText("E4", w / 5 / 2 * 7, h / 5 / 2 * 9);

        ctx.fillText("E5", w / 5 / 2 * 9, h / 5 / 2 * 9);

        options = document.getElementById("minimapNode");

        context = options.getContext("2d");

        options.width = s;

        options.height = s;

        context.globalAlpha = 1;

        context.scale(1, 1);

        context.textAlign = "center";

        context.textBaseline = "middle";

        context.font = "bold 12px Ubuntu";

        this.hide();

        setInterval(function() {

            minimap.drawNodes();

        }, frequency);

    };

    this.uploadSelfPosition = function() {

        if (getCurrentX() && getCurrentY()) {

            s = true;

            conn.uploadCoords({

                x: getCurrentX(),

                y: getCurrentY()

            });

        } else {

            if (s) {

                conn.uploadCoords({

                    x: getCurrentX(),

                    y: getCurrentY()

                });

                s = false;

            }

        }

    };

    this.isExists = function(dataAndEvents) {

        var i = 0;

        for (; i < nodeList.length; i++) {

            if (dataAndEvents == nodeList[i][0]) {

                return i;

            }

        }

        return null;

    };

    this.updateNode = function(obj) {

        var i;

        var node = obj.id;

        var l = obj.x;

        var lat = obj.y;

        var entityName = obj.name;

        if (i = this.isExists(node)) {

            nodeList[i][1] = entityName;

            nodeList[i][2] = l;

            nodeList[i][3] = lat;

            nodeList[i][7] = true;

            nodeList[i][4] = 0 == obj.c ? "#FF4444" : "#448AFF";

            nodeList[i][8] = Date.now();

            if (!(nodeList[i][12] && nodeList[i][13])) {

                nodeList[i][12] = l;

                nodeList[i][13] = lat;

            }

        } else {

            nodeList[nodeList.length] = [node, entityName, null, null, "#448AFF", null, null];

        }

    };

    this.addNode = function(mode) {

        nodeList[nodeList.length] = [mode.id, mode.name, null, null, nodeColor, mode.skinurl, mode.cellColor];

    };

    this.deleteNode = function(el) {};

    this.drawNodes = function() {

        var max = getLengthX();

        var s = getLengthY();

        context.clearRect(0, 0, options.width, options.height);

        var a = getCurrentX();

        var b = getCurrentY();

        if (a) {

            if (b) {

                v.x = nodeList[0][2];

                v.y = nodeList[0][3];

            }

        }

        nodeList[0][2] = a;

        nodeList[0][3] = b;

        nodeList[0][12] = a;

        nodeList[0][13] = b;

        if (myApp.isSpectating) {

            nodeList[1][2] = getTop1X();

            nodeList[1][3] = getTop1Y();

            nodeList[1][12] = getTop1X();

            nodeList[1][13] = getTop1Y();

        }

        var i = 0;

        for (; i < nodeList.length; i++) {

            if (nodeList[i][2] && (nodeList[i][3] && (nodeList[i][12] && (nodeList[i][13] && "del" != nodeList[i][0])))) {

                var x;

                var y;

                var radius;

                radius = 1 == i ? 7 : 5;

                nodeList[i][2] = ~~nodeList[i][2];

                nodeList[i][3] = ~~nodeList[i][3];

                nodeList[i][12] = ~~nodeList[i][12];

                nodeList[i][13] = ~~nodeList[i][13];

                nodeList[i][12] += (max / 2 + nodeList[i][2] - (max / 2 + nodeList[i][12])) / 30;

                nodeList[i][13] += (s / 2 + nodeList[i][3] - (s / 2 + nodeList[i][13])) / 30;

                x = (max / 2 + nodeList[i][12]) / max * w;

                y = (s / 2 + nodeList[i][13]) / s * h;

                context.beginPath();

                context.arc(x, y, radius, 0, 2 * Math.PI, false);

                // Pinta la célula en el minimapa

                context.fillStyle = 1 > i ? "yellow" : nodeList[i][4];

                context.strokeStyle = "rgba(51,51,51,0.5)";

                context.lineWidth = 1;

                context.fill();

                context.stroke();

                if (i > 1) {

                    context.fillStyle = "#FFC0CB";

                    context.fillText(nodeList[i][1], x, y - 10);

                }

            }

        }

        if (v.x) {

            if (v.y) {

                if (!(a && b)) {

                    x = (max / 2 + v.x) / max * w;

                    y = (s / 2 + v.y) / s * h;

                    context.beginPath();

                    context.moveTo(x - 3, y - 3);

                    context.lineTo(x + 3, y + 3);

                    context.moveTo(x + 3, y - 3);

                    context.lineTo(x - 3, y + 3);

                    context.stroke();

                    context.lineWidth = 1;

                    context.strokeStyle = "yellow";

                    context.stroke();

                }

            }

        }

    };

    this.hide = function() {

        $("#minimap").hide();

        $("#minimapNode").hide();

    };

    this.show = function() {

        $("#minimap").show();

        $("#minimapNode").show();

    };

    this.setDeadPosition = function(r) {

        v = r ? r : {};

    };

}



function Connection() {

    var msg;

    var self = this;

    self.connect = function() { //self.connect = function() {

        socket = io("minimap.alis.io:8001", { // IP del chat/minimapa

            transports: ["websocket"]

        });

        socket.on("updateCoords", function(walkers) {

            minimap.updateNode(walkers);

        });

        socket.on("receiveMessage", function(data) {

            chatRoom.receiveMessage(data.sender, data.msg);

        });

    };

    self.emit = function(name, data) {

        socket.emit(name, data);

    };

    self.joinRoom = function(value) {

        if (msg) {

            self.leaveRoom(msg);

        }

        if ("" != $(".partyToken").val()) {

            self.emit("joinRoom", {

                p: value,

                a: 1

            });

            msg = value;

        }

    };

    self.leaveRoom = function(er) {

        self.emit("leaveRoom", er);

    };

    self.uploadCoords = function(data) {

        data.name = myApp.getName();

        data.serverAddress = myApp.getCurrentPartyCode();

        data.timeStamp = Date.now();

        data.socketRoom = msg;

        self.emit("coords", data);

    };

    self.sendMessage = function(message) {

        message.socketRoom = msg;

        if ("" != $(".partyToken").val()) {

            self.emit("sendMessage", message);

        }

    };

}



function isValidHotKey(e) {

    return 48 <= e.keyCode && 57 >= e.keyCode || (65 <= e.keyCode && 90 >= e.keyCode || (9 == e.keyCode || 13 == e.keyCode)) ? true : false;

}



function getPressedKey(e) {

    var optsData = "";

    return e.ctrlKey && (optsData += "CTRL_"), e.altKey && (optsData += "ALT_"), optsData = 9 == e.keyCode ? optsData + "TAB" : 13 == e.keyCode ? optsData + "ENTER" : optsData + String.fromCharCode(e.keyCode);

}



function getHotkeyById(keepData) {

    var unlock;

    for (unlock in hotkeyMapping) {

        if (hotkeyMapping[unlock] == keepData) {

            return unlock;

        }

    }

    return "";

}



function copyToClipboard(el) {

    window.postMessage({

        action: Action.COPY,

        data: el

    }, "*");

}



function escapeRegex(string) {

    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "$&");

}



function drawMinimapNodes() {

    minimap.uploadSelfPosition();

    setTimeout(drawMinimapNodes, 1E3);

}



function updateGameInfoDiv() {

    if ($(".app").is(":visible")) {

        myApp.updateLBInfo();

    }

    setTimeout(updateGameInfoDiv, 1E3);

}



function clearOldNodesData() {

    var i = 1;

    for (; i < nodeList.length; i++) {

        var t = nodeList[i][8];

        if (t) {

            if (5E3 < Date.now() - t) {

                if (2 > i) {

                    nodeList[i][2] = null;

                    nodeList[i][3] = null;

                } else {

                    nodeList[i][0] = "del";

                }

            }

        }

    }

    setTimeout(clearOldNodesData, 5E3);

}



var isEnabledLeaderboardColor = true;



function updateLbDiv() {

    if ($("#div_lb").is(":visible")) {

        var apps = getLB();

        var codeSegments = getSelfIDs();

        var str = "";

        if (apps) {

            var a = 0;

            for (; a < apps.length; a++) {

                var left = false;

                var i = 0;

                for (; i < codeSegments.length; i++) {

                    if (codeSegments[i] == apps[a].id) {

                        left = true;

                        break;

                    }

                }

                i = apps[a].name ? escapeHtml(apps[a].name) : "An unnamed cell";



                if (isEnabledLeaderboardColor) {

                    var color = '#FFFFFF';

                    var leaderboardItem = i;

                    for (var j in tagColors) {

                        if (leaderboardItem['startsWith'](j)) {

                            color = tagColors[j]

                        }

                    };

                    str = str + '<div style=\'color:' + color + '\'>'

                };



                str = left ? str + "<div class='self'>" : str + "<div>";

                str += a + 1 + ". " + i + "</div>";

            }

        }

        document.getElementById("lb_detail").innerHTML = str;

    }

    setTimeout(updateLbDiv, 1E3);

}



function updateScoreDiv() {

    var message = getHighestScore();

    var json = getCell();

    var string = [];

    if (0 != message) {

        if (myApp.isShowScroll) {

            string.push("Score: " + ~~(message / 100));

        }

        if (json) {

            if (0 < json.length) {

                if (myApp.isShowSTE) {

                    message = myApp.getSTE(json);

                    string.push("STE: " + message);

                }

                if (myApp.isShowBallTotal) {

                    string.push("[" + json.length + "/16]");

                }

            }

        }

    }

    if (myApp.isShowFPS) {

        json = getFPS();

        if (50 >= json) {

            json += 8;

        } else {

            if (45 >= json) {

                json += 10;

            } else {

                if (40 >= json) {

                    json += 15;

                }

            }

        }

        string.push("FPS: " + json);

    }

    if (isFreeSpec()) {

        if (myApp.specTeammate) {

            if (myApp.isStopMovement) {

                if (nodeList[myApp.specTeammate]) {

                    string.push("SPEC: " + nodeList[myApp.specTeammate][1]);

                }

            }

        }

    }

    if (myApp.testing) {

        string.push("*** TESTING ***");

    }

    if (0 < string.length) {

        if (!$("#div_score").is(":visible")) {

            $("#div_score").show();

        }

        document.getElementById("div_score").innerHTML = string.join("&nbsp;&nbsp;&nbsp;").trim();

    } else {

        $("#div_score").hide();

    }

    setTimeout(updateScoreDiv, 500);

}

var URL_MESSAGE = "https://googledrive.com/host/0Bx5EmU2kLXq9alVNVTQxX0FFd1k/_message.txt";

var URL_JS_FOLDER = "https://googledrive.com/host/0Bx5EmU2kLXq9alVNVTQxX0FFd1k/";

var testingVal = 29;

var testingCount = 0;

var testingInd = false;

var spectateMode;

if (! function(factory) {

        if ("function" == typeof define && define.amd) {

            define(["jquery"], factory);

        } else {

            if ("object" == typeof exports) {

                module.exports = factory(require("jquery"));

            } else {

                factory(jQuery);

            }

        }

    }(function($) {

        function init(input, settings) {

            var minicolors = $('<div class="minicolors" />');

            var defaults = $.minicolors.defaults;

            input.attr("data-opacity");

            var copyProp;

            if (!input.data("minicolors-initialized")) {

                settings = $.extend(true, {}, defaults, settings);

                minicolors.addClass("minicolors-theme-" + settings.theme).toggleClass("minicolors-with-opacity", settings.opacity).toggleClass("minicolors-no-data-uris", true !== settings.dataUris);

                if (void 0 !== settings.position) {

                    $.each(settings.position.split(" "), function() {

                        minicolors.addClass("minicolors-position-" + this);

                    });

                }

                copyProp = "rgb" === settings.format ? settings.opacity ? "25" : "20" : settings.keywords ? "11" : "7";

                input.addClass("minicolors-input").data("minicolors-initialized", false).data("minicolors-settings", settings).prop("size", copyProp).wrap(minicolors).after('<div class="minicolors-panel minicolors-slider-' + settings.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>');

                if (!settings.inline) {

                    input.after('<span class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></span>');

                    input.next(".minicolors-swatch").on("click", function(types) {

                        types.preventDefault();

                        input.focus();

                    });

                }

                input.parent().find(".minicolors-panel").on("selectstart", function() {

                    return false;

                }).end();

                if (settings.inline) {

                    input.parent().addClass("minicolors-inline");

                }

                updateFromInput(input, false);

                input.data("minicolors-initialized", true);

            }

        }



        function destroy(input) {

            var modifiers = input.parent();

            input.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input");

            modifiers.before(input).remove();

        }



        function show(input) {

            var minicolors = input.parent();

            var event = minicolors.find(".minicolors-panel");

            var settings = input.data("minicolors-settings");

            if (input.data("minicolors-initialized")) {

                if (!input.prop("disabled")) {

                    if (!minicolors.hasClass("minicolors-inline")) {

                        if (!minicolors.hasClass("minicolors-focus")) {

                            hide();

                            minicolors.addClass("minicolors-focus");

                            event.stop(true, true).fadeIn(settings.showSpeed, function() {

                                if (settings.show) {

                                    settings.show.call(input.get(0));

                                }

                            });

                        }

                    }

                }

            }

        }



        function hide() {

            $(".minicolors-focus").each(function() {

                var minicolors = $(this);

                var input = minicolors.find(".minicolors-input");

                var panel = minicolors.find(".minicolors-panel");

                var settings = input.data("minicolors-settings");

                panel.fadeOut(settings.hideSpeed, function() {

                    if (settings.hide) {

                        settings.hide.call(input.get(0));

                    }

                    minicolors.removeClass("minicolors-focus");

                });

            });

        }



        function move(target, e, animate) {

            var input = target.parents(".minicolors").find(".minicolors-input");

            var settings = input.data("minicolors-settings");

            var mod = target.find("[class$=-picker]");

            var offsetX = target.offset().left;

            var offsetY = target.offset().top;

            var posX = Math.round(e.pageX - offsetX);

            var y = Math.round(e.pageY - offsetY);

            animate = animate ? settings.animationSpeed : 0;

            var originalX;

            var originalY;

            var u;

            var theta2;

            if (e.originalEvent.changedTouches) {

                posX = e.originalEvent.changedTouches[0].pageX - offsetX;

                y = e.originalEvent.changedTouches[0].pageY - offsetY;

            }

            if (0 > posX) {

                posX = 0;

            }

            if (0 > y) {

                y = 0;

            }

            if (posX > target.width()) {

                posX = target.width();

            }

            if (y > target.height()) {

                y = target.height();

            }

            if (target.parent().is(".minicolors-slider-wheel")) {

                if (mod.parent().is(".minicolors-grid")) {

                    originalX = 75 - posX;

                    originalY = 75 - y;

                    u = Math.sqrt(originalX * originalX + originalY * originalY);

                    theta2 = Math.atan2(originalY, originalX);

                    if (0 > theta2) {

                        theta2 += 2 * Math.PI;

                    }

                    if (u > 75) {

                        u = 75;

                        posX = 75 - 75 * Math.cos(theta2);

                        y = 75 - 75 * Math.sin(theta2);

                    }

                    posX = Math.round(posX);

                    y = Math.round(y);

                }

            }

            if (target.is(".minicolors-grid")) {

                mod.stop(true).animate({

                    top: y + "px",

                    left: posX + "px"

                }, animate, settings.animationEasing, function() {

                    updateFromControl(input, target);

                });

            } else {

                mod.stop(true).animate({

                    top: y + "px"

                }, animate, settings.animationEasing, function() {

                    updateFromControl(input, target);

                });

            }

        }



        function updateFromControl(input, target) {

            function getCoords(picker, target) {

                var pos;

                var base;

                return picker.length && target ? (pos = picker.offset().left, base = picker.offset().top, {

                    x: pos - target.offset().left + picker.outerWidth() / 2,

                    y: base - target.offset().top + picker.outerHeight() / 2

                }) : null;

            }

            var H;

            var hex;

            var p2;

            var x;

            var y;

            var slider;

            x = input.val();

            var opacity = input.attr("data-opacity");

            y = input.parent();

            var settings = input.data("minicolors-settings");

            var component = y.find(".minicolors-swatch");

            slider = y.find(".minicolors-grid");

            var value = y.find(".minicolors-slider");

            var grid = y.find(".minicolors-opacity-slider");

            p2 = slider.find("[class$=-picker]");

            var picker = value.find("[class$=-picker]");

            var c3 = grid.find("[class$=-picker]");

            if (p2 = getCoords(p2, slider), picker = getCoords(picker, value), c3 = getCoords(c3, grid), target.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {

                switch (settings.control) {

                    case "wheel":

                        x = slider.width() / 2 - p2.x;

                        y = slider.height() / 2 - p2.y;

                        slider = Math.sqrt(x * x + y * y);

                        x = Math.atan2(y, x);

                        if (0 > x) {

                            x += 2 * Math.PI;

                        }

                        if (slider > 75) {

                            slider = 75;

                            p2.x = 69 - 75 * Math.cos(x);

                            p2.y = 69 - 75 * Math.sin(x);

                        }

                        hex = width(slider / 0.75, 0, 100);

                        H = width(180 * x / Math.PI, 0, 360);

                        p2 = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);

                        x = hsb2hex({

                            h: H,

                            s: hex,

                            b: p2

                        });

                        value.css("backgroundColor", hsb2hex({

                            h: H,

                            s: hex,

                            b: 100

                        }));

                        break;

                    case "saturation":

                        H = width(parseInt(p2.x * (360 / slider.width()), 10), 0, 360);

                        hex = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);

                        p2 = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);

                        x = hsb2hex({

                            h: H,

                            s: hex,

                            b: p2

                        });

                        value.css("backgroundColor", hsb2hex({

                            h: H,

                            s: 100,

                            b: p2

                        }));

                        y.find(".minicolors-grid-inner").css("opacity", hex / 100);

                        break;

                    case "brightness":

                        H = width(parseInt(p2.x * (360 / slider.width()), 10), 0, 360);

                        hex = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);

                        p2 = width(100 - Math.floor(picker.y * (100 / value.height())), 0, 100);

                        x = hsb2hex({

                            h: H,

                            s: hex,

                            b: p2

                        });

                        value.css("backgroundColor", hsb2hex({

                            h: H,

                            s: hex,

                            b: 100

                        }));

                        y.find(".minicolors-grid-inner").css("opacity", 1 - p2 / 100);

                        break;

                    default:

                        H = width(360 - parseInt(picker.y * (360 / value.height()), 10), 0, 360);

                        hex = width(Math.floor(p2.x * (100 / slider.width())), 0, 100);

                        p2 = width(100 - Math.floor(p2.y * (100 / slider.height())), 0, 100);

                        x = hsb2hex({

                            h: H,

                            s: hex,

                            b: p2

                        });

                        slider.css("backgroundColor", hsb2hex({

                            h: H,

                            s: 100,

                            b: 100

                        }));

                }

                opacity = settings.opacity ? parseFloat(1 - c3.y / grid.height()).toFixed(2) : 1;

                if (settings.opacity) {

                    input.attr("data-opacity", opacity);

                }

                if ("rgb" === settings.format) {

                    value = hex2rgb(x);

                    opacity = "" === input.attr("data-opacity") ? 1 : width(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1);

                    if (isNaN(opacity) || !settings.opacity) {

                        opacity = 1;

                    }

                    hex = 1 >= input.minicolors("rgbObject").a && (value && settings.opacity) ? "rgba(" + value.r + ", " + value.g + ", " + value.b + ", " + parseFloat(opacity) + ")" : "rgb(" + value.r + ", " + value.g + ", " + value.b + ")";

                } else {

                    hex = convertCase(x, settings.letterCase);

                }

                input.val(hex);

            }

            component.find("span").css({

                backgroundColor: x,

                opacity: opacity

            });

            doChange(input, hex, opacity);

        }



        function updateFromInput(input, recurring) {

            var col;

            var hsb;

            var value;

            var p;

            var end;

            var hex;

            var height;

            var theta2;

            theta2 = input.parent();

            var settings = input.data("minicolors-settings");

            var component = theta2.find(".minicolors-swatch");

            var slider = theta2.find(".minicolors-grid");

            var grid = theta2.find(".minicolors-slider");

            var video = theta2.find(".minicolors-opacity-slider");

            var dragHelper = slider.find("[class$=-picker]");

            var elem = grid.find("[class$=-picker]");

            var $canvas = video.find("[class$=-picker]");

            switch (_forEach(input.val()) ? (col = parseTime(input.val()), end = width(parseFloat(attr(input.val())).toFixed(2), 0, 1), end && input.attr("data-opacity", end)) : col = convertCase(extend(input.val(), true), settings.letterCase), col || (col = convertCase(parseHex(settings.defaultValue, true), settings.letterCase)), hsb = RGBToHSB(col), p = settings.keywords ? $.map(settings.keywords.split(","), function(m3) {

                return $.trim(m3.toLowerCase());

            }) : [], hex = "" !== input.val() && -1 < $.inArray(input.val().toLowerCase(), p) ? convertCase(input.val()) : _forEach(input.val()) ? find(input.val()) : col, recurring || input.val(hex), settings.opacity && (value = "" === input.attr("data-opacity") ? 1 : width(parseFloat(input.attr("data-opacity")).toFixed(2), 0, 1), isNaN(value) && (value = 1), input.attr("data-opacity", value), component.find("span").css("opacity", value), height = width(video.height() - video.height() * value, 0, video.height()),

                $canvas.css("top", height + "px")), "transparent" === input.val().toLowerCase() && component.find("span").css("opacity", 0), component.find("span").css("backgroundColor", col), settings.control) {

                case "wheel":

                    height = width(Math.ceil(0.75 * hsb.s), 0, slider.height() / 2);

                    theta2 = hsb.h * Math.PI / 180;

                    p = width(75 - Math.cos(theta2) * height, 0, slider.width());

                    height = width(75 - Math.sin(theta2) * height, 0, slider.height());

                    dragHelper.css({

                        top: height + "px",

                        left: p + "px"

                    });

                    height = 150 - hsb.b / (100 / slider.height());

                    if ("" === col) {

                        height = 0;

                    }

                    elem.css("top", height + "px");

                    grid.css("backgroundColor", hsb2hex({

                        h: hsb.h,

                        s: hsb.s,

                        b: 100

                    }));

                    break;

                case "saturation":

                    p = width(5 * hsb.h / 12, 0, 150);

                    height = width(slider.height() - Math.ceil(hsb.b / (100 / slider.height())), 0, slider.height());

                    dragHelper.css({

                        top: height + "px",

                        left: p + "px"

                    });

                    height = width(grid.height() - hsb.s * (grid.height() / 100), 0, grid.height());

                    elem.css("top", height + "px");

                    grid.css("backgroundColor", hsb2hex({

                        h: hsb.h,

                        s: 100,

                        b: hsb.b

                    }));

                    theta2.find(".minicolors-grid-inner").css("opacity", hsb.s / 100);

                    break;

                case "brightness":

                    p = width(5 * hsb.h / 12, 0, 150);

                    height = width(slider.height() - Math.ceil(hsb.s / (100 / slider.height())), 0, slider.height());

                    dragHelper.css({

                        top: height + "px",

                        left: p + "px"

                    });

                    height = width(grid.height() - hsb.b * (grid.height() / 100), 0, grid.height());

                    elem.css("top", height + "px");

                    grid.css("backgroundColor", hsb2hex({

                        h: hsb.h,

                        s: hsb.s,

                        b: 100

                    }));

                    theta2.find(".minicolors-grid-inner").css("opacity", 1 - hsb.b / 100);

                    break;

                default:

                    p = width(Math.ceil(hsb.s / (100 / slider.width())), 0, slider.width());

                    height = width(slider.height() - Math.ceil(hsb.b / (100 / slider.height())), 0, slider.height());

                    dragHelper.css({

                        top: height + "px",

                        left: p + "px"

                    });

                    height = width(grid.height() - hsb.h / (360 / grid.height()), 0, grid.height());

                    elem.css("top", height + "px");

                    slider.css("backgroundColor", hsb2hex({

                        h: hsb.h,

                        s: 100,

                        b: 100

                    }));

            }

            if (input.data("minicolors-initialized")) {

                doChange(input, hex, value);

            }

        }



        function doChange(input, name, opacity) {

            var settings = input.data("minicolors-settings");

            var v = input.data("minicolors-lastChange");

            if (!(v && (v.value === name && v.opacity === opacity))) {

                input.data("minicolors-lastChange", {

                    value: name,

                    opacity: opacity

                });

                if (settings.change) {

                    if (settings.changeDelay) {

                        clearTimeout(input.data("minicolors-changeTimeout"));

                        input.data("minicolors-changeTimeout", setTimeout(function() {

                            settings.change.call(input.get(0), name, opacity);

                        }, settings.changeDelay));

                    } else {

                        settings.change.call(input.get(0), name, opacity);

                    }

                }

                input.trigger("change").trigger("input");

            }

        }



        function rgbObject(a) {

            var rgb = extend($(a).val(), true);

            return rgb = hex2rgb(rgb), a = $(a).attr("data-opacity"), rgb ? (void 0 !== a && $.extend(rgb, {

                a: parseFloat(a)

            }), rgb) : null;

        }



        function rgbString(input, rgba) {

            var color = extend($(input).val(), true);

            color = hex2rgb(color);

            var opacity = $(input).attr("data-opacity");

            return color ? (void 0 === opacity && (opacity = 1), rgba ? "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + parseFloat(opacity) + ")" : "rgb(" + color.r + ", " + color.g + ", " + color.b + ")") : null;

        }



        function convertCase(c, letterCase) {

            return "uppercase" === letterCase ? c.toUpperCase() : c.toLowerCase();

        }



        function extend(value, deepDataAndEvents) {

            return value = value.replace(/^#/g, ""), value.match(/^[A-F0-9]{3,6}/gi) ? 3 !== value.length && 6 !== value.length ? "" : (3 === value.length && (deepDataAndEvents && (value = value[0] + value[0] + value[1] + value[1] + value[2] + value[2])), "#" + value) : "";

        }



        function find(results, color) {

            var parts = results.replace(/[^\d,.]/g, "").split(",");

            return parts[0] = width(parseInt(parts[0], 10), 0, 255), parts[1] = width(parseInt(parts[1], 10), 0, 255), parts[2] = width(parseInt(parts[2], 10), 0, 255), parts[3] && (parts[3] = width(parseFloat(parts[3], 10), 0, 1)), color ? {

                r: parts[0],

                g: parts[1],

                b: parts[2],

                a: parts[3] ? parts[3] : null

            } : "undefined" != typeof parts[3] && 1 >= parts[3] ? "rgba(" + parts[0] + ", " + parts[1] + ", " + parts[2] + ", " + parts[3] + ")" : "rgb(" + parts[0] + ", " + parts[1] + ", " + parts[2] + ")";

        }



        function parseHex(data, deepDataAndEvents) {

            return _forEach(data) ? find(data) : extend(data, deepDataAndEvents);

        }



        function width(w, mayParseLabeledStatementInstead, expectedNumberOfNonCommentArgs) {

            return mayParseLabeledStatementInstead > w && (w = mayParseLabeledStatementInstead), w > expectedNumberOfNonCommentArgs && (w = expectedNumberOfNonCommentArgs), w;

        }



        function _forEach(entry) {

            return (entry = entry.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === entry.length ? true : false;

        }



        function attr(k) {

            return (k = k.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i)) && 6 === k.length ? k[4] : "1";

        }



        function parseTime(str) {

            return str = str.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), str && 4 === str.length ? "#" + ("0" + parseInt(str[1], 10).toString(16)).slice(-2) + ("0" + parseInt(str[2], 10).toString(16)).slice(-2) + ("0" + parseInt(str[3], 10).toString(16)).slice(-2) : "";

        }



        function rgb2hex(rgb) {

            var c = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

            return $.each(c, function(eventName, newlines) {

                if (1 === newlines.length) {

                    c[eventName] = "0" + newlines;

                }

            }), "#" + c.join("");

        }



        function hsb2hex(opt_attributes) {

            var r;

            var g;

            var b;

            var rgb2hsv = rgb2hex;

            var a = Math.round(opt_attributes.h);

            var m = Math.round(255 * opt_attributes.s / 100);

            if (opt_attributes = Math.round(255 * opt_attributes.b / 100), 0 === m) {

                r = g = b = opt_attributes;

            } else {

                m = (255 - m) * opt_attributes / 255;

                var vmh = a % 60 * (opt_attributes - m) / 60;

                if (360 === a) {

                    a = 0;

                }

                if (60 > a) {

                    r = opt_attributes;

                    b = m;

                    g = m + vmh;

                } else {

                    if (120 > a) {

                        g = opt_attributes;

                        b = m;

                        r = opt_attributes - vmh;

                    } else {

                        if (180 > a) {

                            g = opt_attributes;

                            r = m;

                            b = m + vmh;

                        } else {

                            if (240 > a) {

                                b = opt_attributes;

                                r = m;

                                g = opt_attributes - vmh;

                            } else {

                                if (300 > a) {

                                    b = opt_attributes;

                                    g = m;

                                    r = m + vmh;

                                } else {

                                    if (360 > a) {

                                        r = opt_attributes;

                                        g = m;

                                        b = opt_attributes - vmh;

                                    } else {

                                        r = 0;

                                        g = 0;

                                        b = 0;

                                    }

                                }

                            }

                        }

                    }

                }

            }

            return rgb2hsv({

                r: Math.round(r),

                g: Math.round(g),

                b: Math.round(b)

            });

        }



        function RGBToHSB(rgb) {

            rgb = hex2rgb(rgb);

            var hsb = {

                h: 0,

                s: 0,

                b: 0

            };

            var max = Math.max(rgb.r, rgb.g, rgb.b);

            var delta = max - Math.min(rgb.r, rgb.g, rgb.b);

            return hsb.b = max, hsb.s = 0 !== max ? 255 * delta / max : 0, 0 !== hsb.s ? rgb.r === max ? hsb.h = (rgb.g - rgb.b) / delta : rgb.g === max ? hsb.h = 2 + (rgb.b - rgb.r) / delta : hsb.h = 4 + (rgb.r - rgb.g) / delta : hsb.h = -1, hsb.h *= 60, 0 > hsb.h && (hsb.h += 360), hsb.s *= 100 / 255, hsb.b *= 100 / 255, rgb = hsb, 0 === rgb.s && (rgb.h = 360), rgb;

        }



        function hex2rgb(hex) {

            return hex = parseInt(-1 < hex.indexOf("#") ? hex.substring(1) : hex, 16), {

                r: hex >> 16,

                g: (65280 & hex) >> 8,

                b: 255 & hex

            };

        }

        $.minicolors = {

            defaults: {

                animationSpeed: 50,

                animationEasing: "swing",

                change: null,

                changeDelay: 0,

                control: "hue",

                dataUris: true,

                defaultValue: "",

                format: "hex",

                hide: null,

                hideSpeed: 100,

                inline: false,

                keywords: "",

                letterCase: "lowercase",

                opacity: false,

                position: "bottom left",

                show: null,

                showSpeed: 100,

                theme: "default"

            }

        };

        $.extend($.fn, {

            minicolors: function(method, data) {

                switch (method) {

                    case "destroy":

                        return $(this).each(function() {

                            destroy($(this));

                        }), $(this);

                    case "hide":

                        return hide(), $(this);

                    case "opacity":

                        return void 0 === data ? $(this).attr("data-opacity") : ($(this).each(function() {

                            updateFromInput($(this).attr("data-opacity", data));

                        }), $(this));

                    case "rgbObject":

                        return rgbObject($(this), "rgbaObject" === method);

                    case "rgbString":

                        ;

                    case "rgbaString":

                        return rgbString($(this), "rgbaString" === method);

                    case "settings":

                        return void 0 === data ? $(this).data("minicolors-settings") : ($(this).each(function() {

                            var settings = $(this).data("minicolors-settings") || {};

                            destroy($(this));

                            $(this).minicolors($.extend(true, settings, data));

                        }), $(this));

                    case "show":

                        return show($(this).eq(0)), $(this);

                    case "value":

                        return void 0 === data ? $(this).val() : ($(this).each(function() {

                            if ("object" == typeof data) {

                                if (data.opacity) {

                                    $(this).attr("data-opacity", width(data.opacity, 0, 1));

                                }

                                if (data.color) {

                                    $(this).val(data.color);

                                }

                            } else {

                                $(this).val(data);

                            }

                            updateFromInput($(this));

                        }), $(this));

                    default:

                        return "create" !== method && (data = method), $(this).each(function() {

                            init($(this), data);

                        }), $(this);

                }

            }

        });

        $(document).on("mousedown.minicolors touchstart.minicolors", function(ev) {

            if (!$(ev.target).parents().add(ev.target).hasClass("minicolors")) {

                hide();

            }

        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function(event) {

            var i = $(this);

            event.preventDefault();

            $(document).data("minicolors-target", i);

            move(i, event, true);

        }).on("mousemove.minicolors touchmove.minicolors", function(completeEvent) {

            var target = $(document).data("minicolors-target");

            if (target) {

                move(target, completeEvent);

            }

        }).on("mouseup.minicolors touchend.minicolors", function() {

            $(this).removeData("minicolors-target");

        }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-swatch", function(types) {

            var environment = $(this).parent().find(".minicolors-input");

            types.preventDefault();

            show(environment);

        }).on("focus.minicolors", ".minicolors-input", function() {

            var input = $(this);

            if (input.data("minicolors-initialized")) {

                show(input);

            }

        }).on("blur.minicolors", ".minicolors-input", function() {

            var elems;

            var params;

            var color;

            var meterPos;

            var value;

            var input = $(this);

            var settings = input.data("minicolors-settings");

            if (input.data("minicolors-initialized")) {

                elems = settings.keywords ? $.map(settings.keywords.split(","), function(m3) {

                    return $.trim(m3.toLowerCase());

                }) : [];

                if ("" !== input.val() && -1 < $.inArray(input.val().toLowerCase(), elems)) {

                    value = input.val();

                } else {

                    if (_forEach(input.val())) {

                        color = find(input.val(), true);

                    } else {

                        params = extend(input.val(), true);

                        color = params ? hex2rgb(params) : null;

                    }

                    value = null === color ? settings.defaultValue : "rgb" === settings.format ? find(settings.opacity ? "rgba(" + color.r + "," + color.g + "," + color.b + "," + input.attr("data-opacity") + ")" : "rgb(" + color.r + "," + color.g + "," + color.b + ")") : rgb2hex(color);

                }

                meterPos = settings.opacity ? input.attr("data-opacity") : 1;

                if ("transparent" === value.toLowerCase()) {

                    meterPos = 0;

                }

                input.closest(".minicolors").find(".minicolors-swatch > span").css("opacity", meterPos);

                input.val(value);

                if ("" === input.val()) {

                    input.val(parseHex(settings.defaultValue, true));

                }

                input.val(convertCase(input.val(), settings.letterCase));

            }

        }).on("keydown.minicolors", ".minicolors-input", function(event) {

            var input = $(this);

            if (input.data("minicolors-initialized")) {

                switch (event.keyCode) {

                    case 9:

                        hide();

                        break;

                    case 13:

                        ;

                    case 27:

                        hide();

                        input.blur();

                }

            }

        }).on("keyup.minicolors", ".minicolors-input", function() {

            var input = $(this);

            if (input.data("minicolors-initialized")) {

                updateFromInput(input, true);

            }

        }).on("paste.minicolors", ".minicolors-input", function() {

            var input = $(this);

            if (input.data("minicolors-initialized")) {

                setTimeout(function() {

                    updateFromInput(input, true);

                }, 1);

            }

        });

    }), -1 < navigator.userAgent.toLowerCase().indexOf("firefox")) {

    throw Error();

}

var PRIVATE_SERVER_IP = "__";



var myApp;

var nodeList = [];

var chatRoom = null;

var minimap = null;

var socket = null;

var currentIP = "";

var teamname = "HKG";

var defaultTeamname = "HKG";

var socketRetryInterval;

var isSocketReady = false;

var isChangeName = false;

var conn = null;

var reconnectCount = 0;

var updateLBCount = 0;

var tmpTeamname = "";

var defaultImage = new Image;

defaultImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTI1Niw0OEMxNDEuMSw0OCw0OCwxNDEuMSw0OCwyNTZzOTMuMSwyMDgsMjA4LDIwOGMxMTQuOSwwLDIwOC05My4xLDIwOC0yMDhTMzcwLjksNDgsMjU2LDQ4eiBNMjU2LDQ0Ni43DQoJCQljLTEwNS4xLDAtMTkwLjctODUuNS0xOTAuNy0xOTAuN2MwLTEwNS4xLDg1LjUtMTkwLjcsMTkwLjctMTkwLjdjMTA1LjEsMCwxOTAuNyw4NS41LDE5MC43LDE5MC43DQoJCQlDNDQ2LjcsMzYxLjEsMzYxLjEsNDQ2LjcsMjU2LDQ0Ni43eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDk2Yy04OC40LDAtMTYwLDcxLjYtMTYwLDE2MGMwLDg4LjQsNzEuNiwxNjAsMTYwLDE2MGM4OC40LDAsMTYwLTcxLjYsMTYwLTE2MEM0MTYsMTY3LjYsMzQ0LjQsOTYsMjU2LDk2eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K";

var customSkin = {

    "": defaultImage

};

var announcementTxt = "";

var Action = {

    COPY: "", //COPY: "HKGAGARTOOLCOPY",

    IMAGE: "", //IMAGE: "HKGAGARTOOLIMAGE",

    FINISH: "" //FINISH: "HKGAGARTOOLFINISH"

};

var isJoinedGame = false;

var hotkeyConfig = {};

var hotkeyMapping = {};

var teammateIdt = {};

var defaultHotkeyMapping = {};

var selectedHotkeyRow;

var chatCommand = {};

var isWindowFocus = true;

var skinDownloadQueue = [];

var skinDownloadFail = {};

var toastQueue = [];

var defaultSkin = "http://i.imgur.com/vX3zql0.png";

var defaultSkin2 = "http://i.imgur.com/EmPUIjo.png";

var gm;

var defaultHotkeyMessageSend = {

    input_hk_send_msg1: "Need backup!",

    input_hk_send_msg2: "Need a teammate!",

    input_hk_send_msg3: "Pop him!",

    input_hk_send_msg4: "We need to run!",

    input_hk_send_msg5: "Tricksplit!",

    input_hk_send_msg6: "Lets bait! ",

    input_hk_send_msg7: "Split into me!",

    input_hk_send_msg8: "Feed me!",

    input_hk_send_msg9: "Tank the virus!",

    input_hk_send_msg10: "Roger that!"

};

var hkgIcon = {};

var selected_profile = 0;



var player_profile = [{

        name: "Profile 1",

        team: "Team1",

        skinurl: defaultSkin

    },

    {

        name: "Profile 2",

        team: "Team2",

        skinurl: defaultSkin2 //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/circles.png"

    },

    {

        name: "Profile 3",

        team: "Team3",

        skinurl: defaultSkin //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 4",

        team: "Team4",

        skinurl: defaultSkin2 //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 5",

        team: "Team5",

        skinurl: defaultSkin //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 6",

        team: "Team6",

        skinurl: defaultSkin2 //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 7",

        team: "Team7",

        skinurl: defaultSkin //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 8",

        team: "Team8",

        skinurl: defaultSkin2 //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 9",

        team: "Team9",

        skinurl: defaultSkin //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    },

    {

        name: "Profile 10",

        team: "Team10",

        skinurl: defaultSkin2 //skinurl: "https://181cfbce4e26cf7f3642ac9e82d9e05ca7869931-www.googledrive.com/host/0B6Qc5Ss9h9-sfmhZMXBsRHYySVZFTzl5cVFkX3VPYjlDU3JJVmhwbzV2LVc5MGk4c3RHVDg/1.png"

    }

];

myApp = new MyApp, myApp.init();

var playerDetailsByIdentifier = {};

var playerDetailsByNick = {};

var announcementSent = false;

! function(self, jQuery) {

    function init() {

        Ze = true;

        cnv = cv = document.getElementById("canvas");

        document.getElementsByClassName("hud").onmousemove = function(e) {

            x = e.clientX;

            y = e.clientY;

            paint();

        };

        context = cnv.getContext("2d");

        if (/firefox/i.test(navigator.userAgent)) {

            document.addEventListener("DOMMouseScroll", onDocumentMouseScroll, false);

        } else {

            document.body.onmousewheel = onDocumentMouseScroll;

        }

        var ne = false;

        var n = false;

        var elm = false;

        self.onkeydown = function(event) {

            if (32 == event.keyCode) {

                if (!chatRoom.isFocus()) {

                    if (!ne) {

                        reset();

                        emit(17);

                        ne = true;

                    }

                }

            }

            if (81 == event.keyCode) {

                if (!n) {

                    emit(18);

                    n = true;

                }

            }

            if (87 == event.keyCode) {

                if (!chatRoom.isFocus()) {

                    if (!elm) {

                        reset();

                        emit(21);

                        elm = true;

                    }

                }

            }

            if (isJoinedGame && !$(".app").is(":visible") || spectateMode) {

                if (27 == event.keyCode) {

                    event.preventDefault();

                    focus(300);

                }

            } else {

                if (27 == event.keyCode) {

                    event.preventDefault();

                    $(".play-button").trigger("click");

                }

            }

        };

        self.onkeyup = function(event) {

            if (32 == event.keyCode) {

                ne = false;

            }

            if (87 == event.keyCode) {

                elm = false;

            }

            if (81 == event.keyCode) {

                if (n) {

                    emit(19);

                    n = false;

                }

            }

        };

        self.onblur = function() {

            emit(19);

            elm = n = ne = false;

        };

        self.onresize = update;

        self.requestAnimationFrame(which);

        setInterval(reset, 42);

        if (0 == last) {

            if (value) {

                send();

            }

        }

        focus(0);

        update();

    }



    function onDocumentMouseScroll(event) {

        if (myApp.isEnableZoom) {

            text *= Math.pow(myApp.getZoomSpeed(), event.wheelDelta / -120 || (event.detail || 0));

            if (myApp.getZoomLimit() > text) {

                text = myApp.getZoomLimit();

            }

            if (text > 1 / scale) {

                text = 1 / scale;

            }

        }

    }



    function bind(type) {

        var p = null;

        if (0 < simpleExpected.playerCells().length) {

            p = simpleExpected.playerCells()[0];

            p = p.name + p.color;

        }

        var xs = jQuery("#skin-url").val();

        if (-1 != xs.indexOf("!!")) {

            try {

                atob(xs.slice(2));

            } catch (i) {}

        }

        return {

            displayName: $("#nickname").val(),

            action: type,

            socketRoom: myApp.getRoom(),

            identifier: p,

            url: myApp.getCustomSkinUrl(),

            nick: $("#nickname").val(),

            team: $("#tag").val(),

            token: myApp.getCurrentPartyCode()

        };

    }



    function paint() {

        if (myApp.isStopMovement) {

            minX = chunk;

            t = loc;

        } else {

            minX = (x - width / 2) / scale + centerX;

            t = (y - height / 2) / scale + centerY;

        }

    }



    function _init() {

        $('.app').fadeOut(250);

        from = to = false;

    }



    function focus(outstandingDataSize) {

        if (!to) {

            if (!from) {

                b = null;

                if (1E3 > outstandingDataSize) {

                    newEnd = 1;

                }

                to = true;

                $('.app').fadeIn(250);

            }

        }

    }



    function _(key) {

        return self.i18n[key] || (self.i18n_dict.en[key] || key);

    }



    function send() {

        if (Ze) {

            if (value) {

                jQuery("#connecting").show();

            }

        }

    }



    function open(url, a) {

        if (currentIP = url, ws) {

            ws.onopen = null;

            ws.onmessage = null;

            ws.onclose = null;

            try {

                ws.close();

            } catch (o) {}

            ws = null;

        }

        if (dst.ip && (url = "ws://" + dst.ip), null != save) {

            var callback = save;

            save = function() {

                callback(a);

            };

        }

        if (ee) {

            var attrList = url.split(":");

            url = attrList[0] + "s://ip-" + attrList[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+attrList[2] + 2E3);

        }

        result = [];

        data = [];

        queue = {};

        list = [];

        siblings = [];

        users = [];

        img = angles = null;

        closingAnimationTime = 0;

        matchEnd = false;

        console.log("Connecting to " + url);

        ws = new WebSocket(url);

        window.webSocket = ws;

        ws.binaryType = "arraybuffer";

        ws.onopen = function() {

            var buf;

            console.log("socket open");

            buf = encode(5);

            buf.setUint8(0, 254);

            buf.setUint32(1, 5, true);

            cb(buf);

            buf = encode(5);

            buf.setUint8(0, 255);

            buf.setUint32(1, 154669603, true);

            cb(buf);

            //buf = encode(1 + a.length);

            buf.setUint8(0, 80);

            var i = 0;

            /*for (; i < a.length; ++i) {

                buf.setUint8(i + 1, a.charCodeAt(i));

            }

            cb(buf);

            oncomplete();

            callback(4 < a.length && 6 >= a.length ? "/#" + a : "/");*/ // corregir

        };

        ws.onmessage = onmessage;

        ws.onclose = listener;

        ws.onerror = function() {

            console.log("socket error");

        };

    }



    function encode(expectedNumberOfNonCommentArgs) {

        return new DataView(new ArrayBuffer(expectedNumberOfNonCommentArgs));

    }



    function cb(s) {

        fx++;

        ws.send(s.buffer);

    }



    function listener() {

        if (matchEnd) {

            backoff = 500;

        }

        // Agregué estp

        console.log("socket close");

        setTimeout(send, backoff);

        backoff *= 2;

    }



    function onmessage(a) {

        parse(new DataView(a.data));

    }



    function parse(view) {

        function encode() {

            var str = "";

            for (;;) {

                var b = view.getUint16(offset, true);

                if (offset += 2, 0 == b) {

                    break;

                }

                str += String.fromCharCode(b);

            }

            return str;

        }

        clockseq++;

        var offset = 0;

        switch (240 == view.getUint8(offset) && (offset += 5), view.getUint8(offset++)) {

            case 16:

                fn(view, offset);

                break;

            case 17:

                chunk = view.getFloat32(offset, true);

                offset += 4;

                loc = view.getFloat32(offset, true);

                offset += 4;

                var col = view.getFloat32(offset, true);

                column = col;

                if (!myApp.isEnableLockZoom) {

                    crashed = col;

                }

                offset += 4;

                break;

            case 18:

                result = [];

                data = [];

                queue = {};

                list = [];

                break;

            case 20:

                data = [];

                result = [];

                break;

            case 21:

                fragment = view.getInt16(offset, true);

                offset += 2;

                m = view.getInt16(offset, true);

                offset += 2;

                if (!Xe) {

                    Xe = true;

                    node = fragment;

                    n = m;

                }

                break;

            case 32:

                result.push(view.getUint32(offset, true));

                offset += 4;

                break;

            case 49:

                if (null != angles) {

                    break;

                }

                col = view.getUint32(offset, true);

                offset += 4;

                users = [];

                var arg = 0;

                for (; col > arg; ++arg) {

                    var matches = view.getUint32(offset, true);

                    offset += 4;

                    users.push({

                        id: matches,

                        name: encode()

                    });

                }

                break;

            case 50:

                angles = [];

                col = view.getUint32(offset, true);

                offset += 4;

                arg = 0;

                for (; col > arg; ++arg) {

                    angles.push(view.getFloat32(offset, true));

                    offset += 4;

                }

                break;

            case 64:

                col = view.getFloat64(offset, true);

                offset += 8;

                arg = view.getFloat64(offset, true);

                offset += 8;

                matches = view.getFloat64(offset, true);

                offset += 8;

                var current = view.getFloat64(offset, true);

                offset += 8;

                if (inArray(matches - col, current - arg)) {

                    right = col;

                    top = arg;

                    left = matches;

                    computed = current;

                } else {

                    if (inArray(col, layers)) {

                        if (matches - stack > 0.01 || -0.01 > matches - stack) {

                            right = col;

                            left = col + 14142.135623730952;

                        }

                    }

                    if (col - layers > 0.01 || -0.01 > col - layers) {

                        if (inArray(matches, stack)) {

                            left = matches;

                            right = matches - 14142.135623730952;

                        }

                    }

                    if (arg - dependencies > 0.01 || -0.01 > arg - dependencies) {

                        if (inArray(current, before)) {

                            computed = current;

                            top = current - 14142.135623730952;

                        }

                    }

                    if (inArray(arg, dependencies)) {

                        if (current - before > 0.01 || -0.01 > current - before) {

                            top = arg;

                            computed = arg + 14142.135623730952;

                        }

                    }

                    if (right > col) {

                        right = col;

                        left = col + 14142.135623730952;

                    }

                    if (matches > left) {

                        left = matches;

                        right = matches - 14142.135623730952;

                    }

                    if (top > arg) {

                        top = arg;

                        computed = arg + 14142.135623730952;

                    }

                    if (current > computed) {

                        computed = current;

                        top = current - 14142.135623730952;

                    }

                    layers = col;

                    dependencies = arg;

                    before = current;

                    stack = matches;

                }

                myApp.afterGameLoaded();

                break;

            case 81:

                var length = view.getUint32(offset, true);

                offset += 4;

                var bytes = view.getUint32(offset, true);

                offset += 4;

                var index = view.getUint32(offset, true);

                offset += 4;

                setTimeout(function() {

                    start({

                        d: length,

                        e: bytes,

                        c: index

                    });

                }, 1200);

        }

    }



    function fn(view, offset) {

        function readFile() {

            var str = "";

            for (;;) {

                var b = view.getUint16(offset, true);

                if (offset += 2, 0 == b) {

                    break;

                }

                str += String.fromCharCode(b);

            }

            return str;

        }



        function getString() {

            var str = "";

            for (;;) {

                var b = view.getUint8(offset++);

                if (0 == b) {

                    break;

                }

                str += String.fromCharCode(b);

            }

            return str;

        }

        min = max = Date.now();

        Ee = false;

        var id = view.getUint16(offset, true);

        offset += 2;

        var key = 0;

        for (; id > key; ++key) {

            var node = queue[view.getUint32(offset, true)];

            var obj = queue[view.getUint32(offset + 4, true)];

            offset += 8;

            if (node) {

                if (obj) {

                    obj.R();

                    obj.o = obj.x;

                    obj.p = obj.y;

                    obj.n = obj.size;

                    obj.C = node.x;

                    obj.D = node.y;

                    obj.m = obj.size;

                    obj.K = max;

                    setData(node, obj);

                }

            }

        }

        key = 0;

        for (; id = view.getUint32(offset, true), offset += 4, 0 != id;) {

            ++key;

            var m;

            node = view.getInt32(offset, true);

            offset += 4;

            obj = view.getInt32(offset, true);

            offset += 4;

            m = view.getInt16(offset, true);

            offset += 2;

            var item = view.getUint8(offset++);

            var value = view.getUint8(offset++);

            var T = view.getUint8(offset++);

            value = flush(item << 16 | value << 8 | T);

            T = view.getUint8(offset++);

            var el = !!(1 & T);

            var j = !!(16 & T);

            var comment = null;

            if (2 & T) {

                offset += 4 + view.getUint32(offset, true);

            }

            if (4 & T) {

                comment = getString();

            }

            var input = readFile();

            item = null;

            if (queue.hasOwnProperty(id)) {

                item = queue[id];

                item.J();

                item.o = item.x;

                item.p = item.y;

                item.n = item.size;

                item.color = value;

            } else {

                item = new set(id, node, obj, m, value, input);

                list.push(item);

                queue[id] = item;

                item.ia = node;

                item.ja = obj;

            }

            item.f = el;

            item.j = j;

            item.C = node;

            item.D = obj;

            item.m = m;

            item.K = max;

            item.T = T;

            if (comment) {

                item.V = comment;

            }

            if (input) {

                item.t(input);

            }

            if (-1 != result.indexOf(id)) {

                if (-1 == data.indexOf(item)) {

                    data.push(item);

                    if (1 == data.length) {

                        centerX = item.x;

                        centerY = item.y;

                        $(".app").hide();

                        a = [];

                        pauseText = 0;

                        col = data[0].color;

                        Bt = true;

                        near = Date.now();

                        count = path = name = 0;

                    }

                }

            }

        }

        node = view.getUint32(offset, true);

        offset += 4;

        key = 0;

        for (; node > key; key++) {

            id = view.getUint32(offset, true);

            offset += 4;

            item = queue[id];

            if (null != item) {

                item.R();

            }

        }

        if (Ee) {

            if (0 == data.length) {

                myApp.onDead();

                far = Date.now();

                Bt = false;

                if (!to) {

                    if (!from) {

                        if (connected) {

                            from = true;

                            $('.app').fadeIn(250);

                        } else {

                            focus(1500);

                        }

                    }

                }

            }

        }

    }



    function reset() {

        if (!myApp.isStopMovement && handler()) {

            var x0 = x - width / 2;

            var x1 = y - height / 2;

            if (!(64 > x0 * x0 + x1 * x1)) {

                if (!(0.01 > Math.abs(maxX - minX) && 0.01 > Math.abs(t1 - t))) {

                    maxX = minX;

                    t1 = t;

                    x0 = encode(13);

                    x0.setUint8(0, 16);

                    x0.setInt32(1, minX, true);

                    x0.setInt32(5, t, true);

                    x0.setUint32(9, 0, true);

                    cb(x0);

                }

            }

        }

    }



    function inArray(arr, array) {

        return 0.01 > arr - array && arr - array > -0.01;

    }



    function writeUTFBytes() {

        if (handler() && (matchEnd && null != b)) {

            var buf = encode(1 + 2 * b.length);

            buf.setUint8(0, 0);

            var bi = 0;

            for (; bi < b.length; ++bi) {

                buf.setUint16(1 + 2 * bi, b.charCodeAt(bi), true);

            }

            cb(buf);

            b = null;

        }

    }



    function handler() {

        return null != ws && ws.readyState == ws.OPEN;

    }



    function emit(expectedNumberOfNonCommentArgs) {

        if (handler()) {

            var buf = encode(1);

            buf.setUint8(0, expectedNumberOfNonCommentArgs);

            cb(buf);

        }

    }



    function update() {

        width = 1 * self.innerWidth;

        height = 1 * self.innerHeight;

        cv.width = cnv.width = width;

        cv.height = cnv.height = height;

        var child = jQuery("#main-content");

        child.css("transform", "none");

        var b = child.height();

        var a = self.innerHeight;

        if (b > a / 1.1) {

            child.css("transform", "translate(-50%, -50%) scale(" + a / b / 1.1 + ")");

        } else {

            child.css("transform", "translate(-50%, -50%)");

        }

        render();

    }



    function requestAnimationFrame() {

        return 1 * Math.max(height / 1080, width / 1920) * text;

    }



    function frame() {

        if (0 != data.length) {

            if (myApp.isEnableLockZoom) {

                offset = requestAnimationFrame();

            } else {

                var offset = 0;

                var i = 0;

                for (; i < data.length; i++) {

                    offset += data[i].size;

                }

                offset = Math.pow(Math.min(64 / offset, 1), 0.4) * requestAnimationFrame();

            }

            scale = (9 * scale + offset) / 10;

        }

    }



    function render() {

        var j;

        var diff = Date.now();

        if (++target, max = diff, 0 < data.length) {

            frame();

            var pos = j = 0;

            var c = 0;

            for (; c < data.length; c++) {

                data[c].J();

                j += data[c].x / data.length;

                pos += data[c].y / data.length;

            }

            chunk = j;

            loc = pos;

            crashed = scale;

            if (myApp.testing) {

                centerX = (testingVal * centerX + chunk) / (testingVal + 1);

                centerY = (testingVal * centerY + loc) / (testingVal + 1);

                console.log(testingVal + 1);

            } else {

                centerX = (centerX + j) / 2;

                centerY = (centerY + pos) / 2;

            }

        } else {

            centerX = (29 * centerX + chunk) / 30;

            centerY = (29 * centerY + loc) / 30;

            scale = (9 * scale + crashed * requestAnimationFrame()) / 10;

        }

        _root = null;

        paint();

        if (!dest) {

            context.clearRect(0, 0, width, height);

        }

        if (dest) {

            context.fillStyle = color ? "#111111" : "#F2FBFF";

            context.globalAlpha = 0.05;

            context.fillRect(0, 0, width, height);

            context.globalAlpha = 1;

        } else {

            redraw();

        }

        list.sort(function(a, b) {

            return a.size == b.size ? a.id - b.id : a.size - b.size;

        });

        context.save();

        context.translate(width / 2, height / 2);

        context.scale(scale, scale);

        context.translate(-centerX, -centerY);

        j = [right, top, left, computed];

        drawText(j, context);

        if (myApp.isEnableMapGrid) {

            draw(j, context);

        }

        c = 0;

        for (; c < siblings.length; c++) {

            siblings[c].s(context);

            console.log(siblings[c]);

        }

        c = 0;

        for (; c < list.length; c++) {

            list[c].s(context);

        }

        if (0 < positions.length) {

            context.fillStyle = $("#pelletColor").minicolors("value");

            context.beginPath();

            j = 0;

            for (; j < positions.length; j++) {

                pos = positions[j];

                context.moveTo(pos.x, pos.y);

                context.arc(pos.x, pos.y, pos.size + 5, 0, PIx2, false);

            }

            context.fill();

            positions = [];

        }



        // Aros al rededor del jugador

        if (data.length && myApp.isEnableSplitInd) {

            context.globalAlpha = 0.7;

            pos = ~~Math.min(5 / scale, 50);

            context.lineWidth = pos;

            c = [];

            j = 0;

            for (; j < data.length; j++) {

                c.push({

                    x: data[j].x,

                    y: data[j].y,

                    size: data[j].size

                });

            }

            c.sort(function(a, b) {

                return a.size - b.size;

            });

            j = 0;

            for (; j < arr.length; j++) {

                var radius = arr[j].size * arr[j].size;

                var i = 0;

                for (; i < c.length; i++) {

                    var r = c[i].size * c[i].size;

                    var g = Math.sqrt(Math.pow(c[i].x - arr[j].x, 2) + Math.pow(c[i].y - arr[j].y, 2));

                    var ml = c[i].size + 655;

                    var b = arr[j].size + 655;

                    if (4 >= c.length && (0.375 * r * 0.37 > radius && 2 * ml - 10 > g)) {

                        arr[j].type = 4;

                        break;

                    }

                    if (8 >= c.length && (0.37 * r > radius && ml > g)) {

                        arr[j].type = 2;

                        break;

                    }

                    if (0.73 * r > radius && ml > g) {

                        arr[j].type = 1;

                        break;

                    }

                    if (0.37 * radius > r && b > g) {

                        arr[j].type = -2;

                        break;

                    }

                    if (0.73 * radius > r && b > g) {

                        arr[j].type = -1;

                        break;

                    }

                }

            }

            c = 0;

            for (; c < items.length; c++) {

                context.strokeStyle = items[c].color;

                context.beginPath();

                j = 0;

                for (; j < arr.length; j++) {

                    if (arr[j].type) {

                        if (arr[j].type == items[c].type) {

                            radius = arr[j].size + pos + 8 + 2 / scale;

                            context.moveTo(arr[j].x + radius, arr[j].y);

                            context.arc(arr[j].x, arr[j].y, radius, 0, PIx2, false);

                        }

                    }

                }

                context.stroke();

            }

        }



        if (arr = [], Xe) {

            node = (3 * node + fragment) / 4;

            n = (3 * n + m) / 4;

            context.save();

            context.strokeStyle = "#FFAAAA";

            context.lineWidth = 10;

            context.lineCap = "round";

            context.lineJoin = "round";

            context.globalAlpha = 0.5;

            context.beginPath();

            c = 0;

            for (; c < data.length; c++) {

                context.moveTo(data[c].x, data[c].y);

                context.lineTo(node, n);

            }

            context.stroke();

            context.restore();

        }

        context.restore();

        closingAnimationTime = Math.max(closingAnimationTime, pick());

        diff = Date.now() - diff;

        if (diff > 1E3 / 60) {

            resolutionScale -= 0.01;

        } else {

            if (1E3 / 65 > diff) {

                resolutionScale += 0.01;

            }

        }

        if (0.4 > resolutionScale) {

            resolutionScale = 0.4;

        }

        if (resolutionScale > 1) {

            resolutionScale = 1;

        }

        diff = max - aux;

        if (!handler() || (to || from)) {

            newEnd += diff / 2E3;

            if (newEnd > 1) {

                newEnd = 1;

            }

        } else {

            newEnd -= diff / 300;

            if (0 > newEnd) {

                newEnd = 0;

            }

        }

        aux = max;

    }



    // Pinta las gridline

    function redraw() {

        if (myApp.isEnableGridline) {

            context.save();

            context.strokeStyle = color ? "#AAAAAA" : "#000000";

            context.globalAlpha = 0.2 * scale;

            context.beginPath();

            var x = width / scale;

            var y = height / scale;

            var bounds = (-centerX + x / 2) % 50;

            for (; x > bounds; bounds += 50) { // Pinta las líneas verticales

                context.moveTo(bounds * scale - 0.5, 0);

                context.lineTo(bounds * scale - 0.5, y * scale);

            }

            bounds = (-centerY + y / 2) % 50;

            for (; y > bounds; bounds += 50) { // Pinta las líneas horizontales

                context.moveTo(0, bounds * scale - 0.5);

                context.lineTo(x * scale, bounds * scale - 0.5);

            }

            context.stroke();

            context.restore();

        }

    }



    function pick() {

        var result = 0;

        var i = 0;

        for (; i < data.length; i++) {

            result += data[i].m * data[i].m;

        }

        return result;

    }



    function Player(opt_vars, x, y, opt_size, b) {

        this.P = opt_vars;

        this.x = x;

        this.y = y;

        this.g = opt_size;

        this.b = b;

    }



    function set(value, x, y, size, color, ms) {

        this.id = value;

        this.o = this.x = x;

        this.p = this.y = y;

        this.n = this.size = size;

        this.color = color;

        this.a = [];

        this.Q();

        this.t(ms);

    }



    function flush(count) {

        count = count.toString(16);

        for (; 6 > count.length;) {

            count = "0" + count;

        }

        return "#" + count;

    }



    function module(moduleNames, moduleDefinition, name, radius) {

        if (moduleNames) {

            this.q = moduleNames;

        }

        if (moduleDefinition) {

            this.M = moduleDefinition;

        }

        this.O = !!name;

        if (radius) {

            this.r = radius;

        }

    }



    function shuffle(arr) {

        var tmp1;

        var rnd;

        var total = arr.length;

        for (; total > 0;) {

            rnd = Math.floor(Math.random() * total);

            total--;

            tmp1 = arr[total];

            arr[total] = arr[rnd];

            arr[rnd] = tmp1;

        }

    }



    function drawText(g, ctx) {

        ctx.save();

        ctx.beginPath();

        ctx.strokeStyle = $("#borderColor").minicolors("value");

        var bw = ctx.lineWidth = 40;

        ctx.strokeRect(g[0] - bw / 2, g[1] - bw / 2, g[2] - g[0] + bw, g[3] - g[1] + bw);

        ctx.restore();

    }



    function draw(t, ctx) {

        var x = Math.round(t[0]) + 40;

        var y = Math.round(t[1]) + 40;

        var second = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        var barWidth = (Math.round(t[2]) - 40 - x) / 5;

        var h = (Math.round(t[3]) - 40 - y) / 5;

        ctx.save();

        ctx.beginPath();

        ctx.lineWidth = 20;

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";

        ctx.font = 0.6 * barWidth + "px Ubuntu";

        ctx.fillStyle = "#1A1A1A";

        var j = 0;

        for (; 5 > j; j++) {

            var i = 0;

            for (; 5 > i; i++) {

                ctx.fillText(second[j] + (i + 1), x + barWidth * i + barWidth / 2, y + h * j + h / 2);

            }

        }

        ctx.lineWidth = 100;

        ctx.strokeStyle = "#1A1A1A";

        j = 0;

        for (; 5 > j; j++) {

            i = 0;

            for (; 5 > i; i++) {

                ctx.strokeRect(x + barWidth * i, y + h * j, barWidth, h);

            }

        }

        ctx.stroke();

        ctx.restore();

    }



    function callback(href) {

        if (self.history) {

            if (self.history.replaceState) {

                self.history.replaceState({}, self.document.title, href);

            }

        }

    }



    function setData(node, data) {

        var o = -1 != result.indexOf(node.id);

        var n = -1 != result.indexOf(data.id);

        var i = 30 > data.size;

        if (o) {

            if (i) {

                ++pauseText;

            }

        }

        if (!i) {

            if (o) {

                if (!n) {

                    ++path;

                }

            }

        }

    }



    function fill(i) {

        i = ~~i;

        var lineNumber = (i % 60).toString();

        return i = (~~(i / 60)).toString(), 2 > lineNumber.length && (lineNumber = "0" + lineNumber), i + ":" + lineNumber;

    }



    function endsWith() {

        if (null == users) {

            return 0;

        }

        var i = 0;

        for (; i < users.length; ++i) {

            if (-1 != result.indexOf(users[i].id)) {

                return i + 1;

            }

        }

        return 0;

    }

    var simpleExpected = {

        context: function() {

            return g_context;

        },

        playerCellIds: function() {

            return g_playerCellIds;

        },

        playerCells: function() {

            return data;

        },

        cellsById: function() {

            return g_cellsById;

        },

        cells: function() {

            return g_cells;

        }

    };

    if (socket.on("playerUpdated", function(p) {

            if ("join" == p.action || "spectate" == p.action) {

                if (0 < simpleExpected.playerCells().length) {

                    conn.emit("playerUpdated", bind("update"));

                }

            }

            if (p.identifier) {

                playerDetailsByIdentifier[p.identifier] = p;

                playerDetailsByNick[p.nick] = p;

            }

        }), self.moveTo = function(lab, dragging) {

            if (lab) {

                if (dragging) {

                    myApp.isStopMovement = true;

                }

            }

        }, self.setPosition = function(p, index) {

            if (handler()) {

                var buf = encode(13);

                buf.setUint8(0, 16);

                buf.setInt32(1, p, true);

                buf.setInt32(5, index, true);

                buf.setUint32(9, 0, true);

                cb(buf);

            }

        }, window.handleQuickW = function() {

            if (myApp.autoW) {

                var buf = encode(1);

                buf.setUint8(0, 21);

                cb(buf);

                setTimeout(handleQuickW, 142);

            }

        }, !self.agarioNoInit) {

        var ee = "https:" == self.location.protocol;

        if (ee && -1 == self.location.search.indexOf("fb")) {

            self.location.href = "http://agar.io/";

        } else {

            var cv;

            var context;

            var cnv;

            var width;

            var height;

            var _root = null;

            var ws = null;

            var centerX = 0;

            var centerY = 0;

            var result = [];

            var data = [];

            var queue = {};

            var list = [];

            var siblings = [];

            var users = [];

            var x = 0;

            var y = 0;

            var minX = -1;

            var t = -1;

            var target = 0;

            var max = 0;

            var aux = 0;

            var b = null;

            var right = -7071.067811865476;

            var top = -7071.06781186547;

            var left = 7071.067811865476;

            var computed = 7071.067811865476;

            var layers = 0;

            var dependencies = 0;

            var stack = 0;

            var before = 0;

            var scale = 1;

            var value = null;

            var error = true;

            var oldStatus = true;

            var doneResults = false;

            var Ee = false;

            var closingAnimationTime = 0;

            var color = 1;

            var $timeout = false;

            var chunk = centerX = ~~((right + left) / 2);

            var loc = centerY = ~~((top + computed) / 2);

            var crashed = 1;

            var index = "";

            var angles = null;

            var Ze = false;

            var Xe = false;

            var fragment = 0;

            var m = 0;

            var node = 0;

            var n = 0;

            var compassResult = 0;

            var cs = ["#333333", "#FF3333", "#33FF33", "#3333FF"];

            var dest = false;

            var matchEnd = false;

            var min = 0;

            var text = 1;

            var newEnd = 1;

            var to = false;

            var last = 0;

            var dst = {};

            var c = "";

            var deep = 0;

            var arr = [];

            var PIx2 = 2 * Math.PI;

            var column = 0;

            var clockseq = 0;

            var fx = 0;

            var _clockseq = 0;

            var type = 0;

            var positions = [];

            var items = [{

                type: 1,

                color: "#d3d3d3" // gris

            }, {

                type: 2,

                color: "#76FF03" // verde

            }, {

                type: 4,

                color: "#2196F3" // azul

            }, {

                type: -1,

                color: "#FF9800" // naranja

            }, {

                type: -2,

                color: "#FD0000" // rojo

            }, {

                type: -4,

                color: "white"

            }];

            setInterval(function() {

                _clockseq = clockseq;

                clockseq = 0;

                type = fx;

                fx = 0;

            }, 1E3); // 1000 ms = 1 segundos

            (function() {

                var params = self.location.search;

                if ("?" == params.charAt(0)) {

                    params = params.slice(1);

                }

                params = params.split("&");

                var i = 0;

                for (; i < params.length; i++) {

                    var src = params[i].split("=");

                    dst[src[0]] = src[1];

                }

            })();

            var test_canvas = document.createElement("canvas");

            if ("undefined" == typeof console || ("undefined" == typeof DataView || ("undefined" == typeof WebSocket || (null == test_canvas || (null == test_canvas.getContext || null == self.localStorage))))) {

                alert("You browser does not support this game, we recommend you to use Firefox to play this");

            } else {

                var old = null;

                self.setNick = function(v) {

                    if (self.ga) {

                        self.ga("send", "event", "Nick", v.toLowerCase());

                    }

                    _init();

                    b = v;

                    writeUTFBytes();

                    closingAnimationTime = 0;

                    setLocalStorage("nick", v);

                    myApp.newGame();

                };

                self.setSkins = function(err) {

                    error = err;

                };

                self.setNames = function(newStatus) {

                    oldStatus = newStatus;

                };

                self.setDarkTheme = function(newColor) {

                    color = newColor;

                };

                self.setColors = function(data) {

                    doneResults = data;

                };

                self.setShowMass = function(_$timeout_) {

                    $timeout = _$timeout_;

                };

                self.getCurrentX = function() {

                    return data.length ? centerX - (left - 7071.067811865476) : "";

                };

                self.getCurrentY = function() {

                    return data.length ? centerY - (computed - 7071.067811865476) : "";

                };

                self.getTop1X = function() {

                    return chunk;

                };

                self.getTop1Y = function() {

                    return loc;

                };

                self.getLengthX = function() {

                    return 14142.135623730952;

                };

                self.getLengthY = function() {

                    return 14142.135623730952;

                };

                self.getLB = function() {

                    return users;

                };

                self.getSelfIDs = function() {

                    return result;

                };

                self.getCell = function() {

                    return data;

                };

                self.getHighestScore = function() {

                    return closingAnimationTime;

                };

                self.quickSpace = function() {

                    if (0 != data.length) {

                        emit(17);

                        setTimeout(function() {

                            emit(17);

                        }, 40);

                        setTimeout(function() {

                            emit(17);

                        }, 80);

                        setTimeout(function() {

                            emit(17);

                        }, 120);

                    }

                };

                self.doubleSpace = function() {

                    setTimeout(function() {

                        emit(17);

                    }, 50);

                    setTimeout(function() {

                        emit(17);

                    }, 100);

                };

                self.getFPS = function() {

                    return deep;

                };

                self.getPacketIO = function() {

                    return [_clockseq, type];

                };

                self.spectate = function() {

                    isJoinedGame = false;

                    spectateMode = true;

                    b = null;

                    emit(1);

                    _init();

                    myApp.spectate(data);

                    var cb = bind("spectate");

                    conn.emit("playerEntered", cb);

                };

                self.setZoomLevel = function(textAlt) {

                    text = textAlt;

                };

                self.isFreeSpec = function() {

                    return myApp.isSpectating && 0.25 === column;

                };

                self.setAcid = function(vec) {

                    dest = vec;

                };

                if (null != self.localStorage) {

                    if (null == self.localStorage.AB9) {

                        self.localStorage.AB9 = 0 + ~~(100 * Math.random());

                    }

                    compassResult = +self.localStorage.AB9;

                    self.ABGroup = compassResult;

                }

                var save = null;

                self.connect = open;

                var backoff = 500;

                var tref = null;

                var millis = 0;

                var maxX = -1;

                var t1 = -1;

                var img = null;

                var resolutionScale = 1;

                var which = function() {

                    Date.now();

                    var diff = 0;

                    var aux = Date.now();

                    return function() {

                        self.requestAnimationFrame(which);

                        var max = Date.now();

                        if (myApp.isShowFPS) {

                            if (diff > 1E3) {

                                aux = max;

                                diff = 0;

                                deep = target;

                                target = 0;

                            } else {

                                diff = max - aux;

                            }

                        }

                        if (!handler() || 240 > Date.now() - min) {

                            render();

                        }

                    };

                }();

                var results = {};

                var numbers = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";");

                var reserved = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";");

                var images = {};

                Player.prototype = {

                    P: null,

                    x: 0,

                    y: 0,

                    g: 0,

                    b: 0

                };

                set.prototype = {

                    id: 0,

                    a: null,

                    name: null,

                    k: null,

                    I: null,

                    x: 0,

                    y: 0,

                    size: 0,

                    o: 0,

                    p: 0,

                    n: 0,

                    C: 0,

                    D: 0,

                    m: 0,

                    T: 0,

                    K: 0,

                    W: 0,

                    A: false,

                    f: false,

                    j: false,

                    L: true,

                    S: 0,

                    V: null,

                    R: function() {

                        var i;

                        i = 0;

                        for (; i < list.length; i++) {

                            if (list[i] == this) {

                                list.splice(i, 1);

                                break;

                            }

                        }

                        delete queue[this.id];

                        i = data.indexOf(this);

                        if (-1 != i) {

                            Ee = true;

                            data.splice(i, 1);

                        }

                        i = result.indexOf(this.id);

                        if (-1 != i) {

                            result.splice(i, 1);

                        }

                        this.A = true;

                    },

                    i: function() {

                        return Math.max(~~(0.3 * this.size), 24);

                    },

                    t: function(str) {

                        var directives = str.match(/\u0001([\u0002-\uffff]|[\u0002-\uffff]\uffff)$/g);

                        var a = 0;

                        if (directives) {

                            a = directives[0].split("\u0001")[1];

                            if (1 < a.length) {

                                this.img = a.charCodeAt(0) + 65534;

                            }

                        }

                        if (this.name = str) {

                            if (null == this.k) {

                                this.k = new module(this.i(), "#FFFFFF", true, "#000000");

                                this.k.v = Math.ceil(10 * scale) / 10;

                            } else {

                                this.k.G(this.i());

                            }

                            this.k.u(this.name);

                        }

                    },

                    Q: function() {

                        var a = this.B();

                        for (; this.a.length > a;) {

                            var data = ~~(Math.random() * this.a.length);

                            this.a.splice(data, 1);

                        }

                        if (0 == this.a.length) {

                            if (a > 0) {

                                this.a.push(new Player(this, this.x, this.y, this.size, Math.random() - 0.5));

                            }

                        }

                        for (; this.a.length < a;) {

                            data = ~~(Math.random() * this.a.length);

                            data = this.a[data];

                            this.a.push(new Player(this, data.x, data.y, data.g, data.b));

                        }

                    },

                    B: function() {

                        var rh = 10;

                        if (20 > this.size) {

                            rh = 0;

                        }

                        if (this.f) {

                            rh = 30;

                        }

                        var height = this.size;

                        return this.f || (height *= scale),

                            height *= resolutionScale,

                            32 & this.T && (height *= 0.25),

                            ~~Math.max(height, rh);

                    },



                    // Este es el efecto gelatina

                    da: function() {

                        this.Q();

                        var nodes = this.a;

                        var n = nodes.length;

                        var i = 0;

                        //console.log("nodos: " + n);

                        /* 

                        * Cuando el efecto es agarplus, osea simpleDrawing, la cantidad de nodos siempre es 100 a veces 99, aunque me divida o no me divida.

                        /* 

                        * Cuando el efecto es agarplus, osea simpleDrawing, la cantidad de nodos siempre es 100 a veces 99, aunque me divida o no me divida.

                        

                        * Cuando es efecto gelatina, la cantidad de nodos varía. Cuánto más me divido la cantidad de nodos es menor, y cuando estoy unido es mayor. A parte, varía con el zoom. A mayor zoom, menos es la cantidad de nodos.

                        */

                        /* Cuando es efecto gelatina, la cantidad de nodos varía. Cuánto más me divido la cantidad de nodos es menor, y cuando estoy unido es mayor. A parte, varía con el zoom. A mayor zoom, menos es la cantidad de nodos.

                        */

                        for (i = 0; i < n; ++i) {

                            var a = nodes[(i - 1 + n) % n].b;

                            var b = nodes[(i + 1) % n].b;

                            nodes[i].b += (Math.random() - 0.5) * (this.j ? 3 : 1);

                            nodes[i].b *= 0.7;

                            if (10 < nodes[i].b) {

                                nodes[i].b = 10;

                            }

                            if (-10 > nodes[i].b) {

                                nodes[i].b = -10;

                            }

                            nodes[i].b = (a + b + 8 * nodes[i].b) / 10;

                        }

                        var ELEMENT_NODE = this;

                        var sa = this.f ? 0 : (this.id / 1E3 + max / 1E4) % (2 * Math.PI);

                        i = 0;

                        for (; n > i; ++i) {

                            var g = nodes[i].g;

                            if (a = nodes[(i - 1 + n) % n].g, b = nodes[(i + 1) % n].g, 15 < this.size && (null != _root && (20 < this.size * scale && 0 < this.id))) {

                                var r = false;

                                var x = nodes[i].x;

                                var y = nodes[i].y;

                                _root.ea(x - 5, y - 5, 10, 10, function(node) {

                                    if (node.P != ELEMENT_NODE) {

                                        if (25 > (x - node.x) * (x - node.x) + (y - node.y) * (y - node.y)) {

                                            r = true;

                                        }

                                    }

                                });

                                if (!r) {

                                    if (nodes[i].x < right || (nodes[i].y < top || (nodes[i].x > left || nodes[i].y > computed))) {

                                        r = true;

                                    }

                                }

                                if (r) {

                                    if (0 < nodes[i].b) {

                                        nodes[i].b = 0;

                                    }

                                    --nodes[i].b;

                                }

                            }

                            g += nodes[i].b;

                            if (0 > g) {

                                g = 0;

                            }

                            g = this.j ? (19 * g + this.size) / 20 : (12 * g + this.size) / 13;

                            nodes[i].g = (a + b + 8 * g) / 10;

                            a = 2 * Math.PI / n;

                            b = this.a[i].g;

                            if (this.f) {

                                if (0 == i % 2) {

                                    b += 5;

                                }

                            }

                            nodes[i].x = this.x + Math.cos(a * i + sa) * b;

                            nodes[i].y = this.y + Math.sin(a * i + sa) * b;

                        }

                    },

                    J: function() {

                        if (0 >= this.id) {

                            return 1;

                        }

                        var p;

                        p = (max - this.K) / 120;

                        p = 0 > p ? 0 : p > 1 ? 1 : p;

                        var n = 0 > p ? 0 : p > 1 ? 1 : p;

                        if (this.i(), this.A && n >= 1) {

                            var index = siblings.indexOf(this);

                            if (-1 != index) {

                                siblings.splice(index, 1);

                            }

                        }

                        return this.x = p * (this.C - this.o) + this.o, this.y = p * (this.D - this.p) + this.p, this.size = n * (this.m - this.n) + this.n, n;

                    },

                    H: function() {

                        return 0 >= this.id ? true : this.x + this.size + 40 < centerX - width / 2 / scale || (this.y + this.size + 40 < centerY - height / 2 / scale || (this.x - this.size - 40 > centerX + width / 2 / scale || this.y - this.size - 40 > centerY + height / 2 / scale)) ? false : true;

                    },

                    s: function(ctx) {

                        if (this.H()) {

                            var f = myApp.isEnableSimpleDrawing;

                            if (this.size < 15) {

                                if (!myApp.isEnableHideFood) {

                                    if (myApp.isSameColorFood) {

                                        positions.push({

                                            x: this.x,

                                            y: this.y,

                                            size: this.size

                                        });

                                    } else {

                                        ctx.beginPath();

                                        ctx.fillStyle = this.color;

                                        ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);

                                        ctx.fill();

                                    }

                                }

                            } else {

                                ++this.S;

                                var y_position = 0 < this.id && (!this.f && (!this.j && 0.4 > scale));

                                if (5 > this.B() && (0 < this.id && (y_position = true)), this.L && !y_position) {

                                    var i = 0;

                                    for (; i < this.a.length; i++) {

                                        this.a[i].g = this.size;

                                    }

                                }

                                this.L = y_position;

                                ctx.save();

                                this.W = max;

                                i = this.J();

                                if (this.A) {

                                    ctx.globalAlpha *= 1 - i;

                                }

                                ctx.lineWidth = 10;

                                ctx.lineCap = "round";

                                ctx.lineJoin = this.f ? "miter" : "round";

                                i = !this.f && (0 < this.id && (15 <= this.size && !this.j)) ? true : false;

                                var v;

                                var isHideSelfName = false;

                                var x = null;

                                if (v = this.name + this.color, v = v in playerDetailsByIdentifier ? playerDetailsByIdentifier[v] : void 0, i) {

                                    if (myApp.isTransparentCell) {

                                        ctx.globalAlpha = 0.8;

                                    }

                                    var c = 0;

                                    for (; c < result.length; c++) {

                                        if (this.id === result[c]) {

                                            isHideSelfName = true;

                                        }

                                    }

                                    if (isHideSelfName) {

                                        if (myApp.isEnableCursorLine) {

                                            ctx.save();

                                            ctx.strokeStyle = "#E3F2FD";

                                            ctx.lineWidth = 2;

                                            ctx.lineCap = "round";

                                            ctx.lineJoin = "round";

                                            ctx.globalAlpha = 0.8;

                                            ctx.beginPath();

                                            ctx.moveTo(this.x, this.y);

                                            ctx.lineTo(minX, t);

                                            ctx.stroke();

                                            ctx.restore();

                                        }

                                        if (myApp.isEnableAttackRange) {

                                            ctx.beginPath();

                                            ctx.strokeStyle = color ? "white" : "black";

                                            ctx.arc(this.x, this.y, this.size + myApp.attackRangeRadius, 0, 2 * Math.PI, false);

                                            ctx.stroke();

                                            ctx.closePath();

                                        }

                                        if (myApp.isEnableCustomSkin) {

                                            x = myApp.getSkinImage(nodeList[0][5]);

                                        }

                                    }

                                }

                                if (doneResults ? (ctx.fillStyle = "#FFFFFF", ctx.strokeStyle = "#AAAAAA") : (ctx.fillStyle = this.color, ctx.strokeStyle = this.color), f && (this.f && (ctx.fillStyle = "#6e6e6e", ctx.globalAlpha = 0.8, ctx.lineWidth = 10, ctx.strokeStyle = "#FFFFFF")), f || y_position) {



                                    // Para que en todo momento se dibuje el efecto gelatino, se tiene que hacer f = falso y además y_position igual a falso



                                    // Aquí dibuja la célula sin el efecto smooth, así como agarplus

                                    ctx.beginPath();

                                    ctx.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);

                                    if (myApp.isEnableSplitInd) {

                                        if (i) {

                                            if (!isHideSelfName) {

                                                if (this.name || 38 < this.size) {

                                                    arr.push({

                                                        x: this.x,

                                                        y: this.y,

                                                        size: this.size

                                                    });

                                                }

                                            }

                                        }

                                    }

                                } else {

                                    // Aquí dibuja la célula con el efecto smooth, como gelatina

                                    this.da();

                                    ctx.beginPath();

                                    var n = this.B();

                                    ctx.moveTo(this.a[0].x, this.a[0].y);

                                    i = 1;

                                    for (; i <= n; ++i) {

                                        c = i % n;

                                        ctx.lineTo(this.a[c].x, this.a[c].y);

                                    }

                                }

                                if (ctx.closePath(), i = this.name.toLowerCase(),



                                    c = this.img ? "http://upload.happyfor.me/getimg.php?id=" + this.img + "&_t=" + Math.random() : "skins/" + i + ".png", //c = this.img ? "http://upload.happyfor.me/getimg.php?id=" + this.img + "&_t=" + Math.random() : "skins/" + i + ".png", 



                                    x || (this.j || (!error && !myApp.isEnableOtherSkinSupport || ":teams" == index)) ? n = null : (n = this.V, null == n ? n = null : ":" == n[0] ? (images.hasOwnProperty(n) || (images[n] = new Image, images[n].src = n.slice(1)), n = 0 != images[n].width && images[n].complete ? images[n] : null) : n = null, n || (-1 !=

                                        numbers.indexOf(i) && error || this.img ? ($.hasOwnProperty(i) || ($[i] = new Image, $[i].src = c), n = 0 != $[i].width && $[i].complete ? $[i] : null) : n = null)), c = n, y_position || f && (this.f && ctx.stroke()), ctx.fill(), myApp.isEnableCustomSkin && (n = null, x = false, v && (x = v.url), x && (results.hasOwnProperty(x) || (v = new Image, v.src = x, results[x] = v), results[x].width && (results[x].complete && (n = results[x]))), c = n, null != c)) {

                                    var size = Math.min(c.width, c.height);

                                    var startX = (c.width - size) / 2;

                                    var offsetY = (c.height - size) / 2;

                                    var y = this.size + 5;

                                }

                                if (null != c && (ctx.save(), ctx.clip(), ctx.drawImage(c, startX, offsetY, size, size, this.x - y, this.y - y, 2 * y, 2 * y), ctx.restore()), f || ((doneResults || 15 < this.size) && (y_position || (ctx.strokeStyle = "#000000", ctx.globalAlpha *= 0.1, ctx.stroke())), ctx.globalAlpha = 1), n = -1 != data.indexOf(this), y_position = ~~this.y, f = this.f || (315 < this.size || 18 < this.size * scale), !(isHideSelfName && myApp.isHideSelfName || myApp.isAutoHideName && !f) && (0 != this.id &&

                                        ((oldStatus || n) && (this.name && (this.k && (null == c || -1 == reserved.indexOf(i))))))) {

                                    c = this.k;

                                    c.u(this.name);

                                    c.G(this.i() / 0.9);

                                    i = 0 >= this.id ? 1 : Math.ceil(10 * scale) / 10;

                                    c.U(i);

                                    c = c.F();

                                    var glockBottomWidth = ~~(c.width / i);

                                    var sh = ~~(c.height / i);

                                    ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2), glockBottomWidth, sh);

                                    y_position += c.height / 2 / i + 4;

                                }

                                if (!myApp.isAutoHideMass || f) {

                                    if (myApp.isEnableShowAllMass) {

                                        if (0 < this.id) {

                                            if ($timeout) {

                                                if (38 < this.size) {

                                                    if (null == this.I) {

                                                        this.I = new module(this.i() / 2, "#FFFFFF", true, "#000000");

                                                    }

                                                    n = this.I;

                                                    n.G(this.i() / 0.8);

                                                    n.u(~~(this.size * this.size / 100));

                                                    i = Math.ceil(10 * scale) / 10;

                                                    n.U(i);

                                                    c = n.F();

                                                    glockBottomWidth = ~~(c.width / i);

                                                    sh = ~~(c.height / i);

                                                    ctx.drawImage(c, ~~this.x - ~~(glockBottomWidth / 2), y_position - ~~(sh / 2.7), glockBottomWidth, sh);

                                                }

                                            }

                                        }

                                    }

                                }

                                ctx.restore();

                            }

                        }

                    }

                };

                module.prototype = {

                    w: "",

                    M: "#000000",

                    O: false,

                    r: "#000000",

                    q: 16,

                    l: null,

                    N: null,

                    h: false,

                    v: 1,

                    G: function(x) {

                        if (5 < Math.abs(x - this.q)) {

                            if (this.q != x) {

                                this.q = x;

                                this.h = true;

                            }

                        }

                    },

                    U: function(v) {

                        if (this.v != v) {

                            this.v = v;

                            this.h = true;

                        }

                    },

                    setStrokeColor: function(r) {

                        if (this.r != r) {

                            this.r = r;

                            this.h = true;

                        }

                    },

                    u: function(n) {

                        var w;

                        if (!isNaN(n)) {

                            if (!isNaN(this.w)) {

                                if (0 != this.w) {

                                    if (0 != n) {

                                        if (this.w != n) {

                                            if (0.012 > Math.abs((n - this.w) / this.w)) {

                                                w = this.w;

                                                this.w = n;

                                            }

                                        }

                                    }

                                }

                            }

                        }

                        if (n != this.w) {

                            this.w = n;

                            this.h = true;

                        }

                        if (w) {

                            this.w = w;

                        }

                    },

                    F: function() {

                        if (null == this.l && (this.l = document.createElement("canvas"), this.N = this.l.getContext("2d")), this.h) {

                            this.h = false;

                            var size = this.l;

                            var c = this.N;

                            var line = this.w;

                            var factor = this.v;

                            var right = this.q;

                            var font = "bold " + right + "px Ubuntu";

                            c.font = font;

                            var left = ~~(0.2 * right);

                            size.width = (c.measureText(line).width + 6) * factor;

                            size.height = (right + left) * factor;

                            c.font = font;

                            c.scale(factor, factor);

                            c.globalAlpha = 1;

                            c.fillStyle = this.M;

                            if (myApp.isShowTextStrokeLine) {

                                c.lineWidth = 5;

                                c.strokeStyle = this.r;

                                if (this.O) {

                                    c.strokeText(line, 3, right - left / 2);

                                }

                            }

                            c.fillText(line, 3, right - left / 2);

                        }

                        return this.l;

                    }

                };

                if (!Date.now) {

                    Date.now = function() {

                        return (new Date).getTime();

                    };

                }

                (function() {

                    var vendors = ["ms", "moz", "webkit", "o"];

                    var x = 0;

                    for (; x < vendors.length && !self.requestAnimationFrame; ++x) {

                        self.requestAnimationFrame = self[vendors[x] + "RequestAnimationFrame"];

                        self.cancelAnimationFrame = self[vendors[x] + "CancelAnimationFrame"] || self[vendors[x] + "CancelRequestAnimationFrame"];

                    }

                    if (!self.requestAnimationFrame) {

                        self.requestAnimationFrame = function(callback) {

                            return setTimeout(callback, 1E3 / 60);

                        };

                        self.cancelAnimationFrame = function(id) {

                            clearTimeout(id);

                        };

                    }

                })();

                var a = [];

                var pauseText = 0;

                var col = "#000000";

                var from = false;

                var Bt = false;

                var near = 0;

                var far = 0;

                var name = 0;

                var path = 0;

                var count = 0;

                var connected = true;

                setInterval(function() {

                    if (Bt) {

                        a.push(pick() / 100);

                    }

                }, 1E3 / 60);

                setInterval(function() {

                    var tempCount = endsWith();

                    if (0 != tempCount) {

                        ++name;

                        if (0 == count) {

                            count = tempCount;

                        }

                        count = Math.min(count, tempCount);

                    }

                }, 1E3);

                jQuery(function() {

                    jQuery(init);

                });

            }

        }

    }

}(window, window.jQuery),



myApp.afterGameLogicLoaded(),

    $(document).keydown(function(e) {

        if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {

            var username = "";

            if (isValidHotKey(e) && (username = getPressedKey(e)), 18 == e.keyCode && e.preventDefault(), selectedHotkeyRow) {

                //console.log(e + " / " + e.keyCode + " / " + getPressedKey(e) + " / " + username);

                if (46 == e.keyCode) {

                    e.preventDefault();

                    selectedHotkeyRow.find(".hotkey").text(username);

                } else {

                    if ("" != username) {

                        e.preventDefault();

                        var codeSegments = $(".hotkey");

                        var i = 0;

                        for (; i < codeSegments.length; i++) {

                            if ($(codeSegments[i]).text() == username) {

                                return;

                            }

                        }

                        selectedHotkeyRow.find(".hotkey").text(username);

                        selectedHotkeyRow.removeClass("table-row-selected");

                        selectedHotkeyRow = null;

                    }

                }

            }

            if ("" != username) {

                if (hotkeyMapping[username]) {

                    e.preventDefault();

                    if (hotkeyConfig[hotkeyMapping[username]]) {

                        if (hotkeyConfig[hotkeyMapping[username]].keyDown) {

                            hotkeyConfig[hotkeyMapping[username]].keyDown();

                        }

                    }

                }

            }

        }

    }),

    $(document).keyup(function(e) {

        if ("input" != e.target.tagName.toLowerCase() && "textarea" != e.target.tagName.toLowerCase() || 13 == e.keyCode) {

            var rt = "";

            if (isValidHotKey(e)) {

                rt = getPressedKey(e);

            }

            if ("" != rt) {

                if (hotkeyMapping[rt]) {

                    e.preventDefault();

                    if (hotkeyConfig[hotkeyMapping[rt]]) {

                        if (hotkeyConfig[hotkeyMapping[rt]].keyUp) {

                            hotkeyConfig[hotkeyMapping[rt]].keyUp();

                        }

                    }

                }

            }

        }

    }),



    $(".hud").mousedown(function(e) {

        if (0 === e.button) {

            if (myApp.isEnableMouseW) {

                if ("input" != e.target.tagName.toLowerCase() || "textarea" != e.target.tagName.toLowerCase()) {

                    myApp.autoW = true;

                    handleQuickW();

                    e.preventDefault();

                }

            }

        } else {

            if (2 === e.button) {

                $("#opt_chatbox").click();

            }

        }

    }),

    $(".hud").mouseup(function(e) {

        if (0 === e.button) {

            if (myApp.isEnableMouseW) {

                if ("input" != e.target.tagName.toLowerCase()) {

                    if ("textarea" != e.target.tagName.toLowerCase()) {

                        myApp.autoW = false;

                        e.preventDefault();

                    }

                }

            }

        }

    });



var escapeHtml = function() {

    var buf = {

        '"': "&quot;",

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;"

    };

    return function(messageFormat) {

        return messageFormat.replace(/[\"&<>]/g, function(off) {

            return buf[off];

        });

    };

}();

var disconnectTimeout;

$(window).focus(function() {

    isWindowFocus = true;

    if (disconnectTimeout) {

        clearTimeout(disconnectTimeout);

    }

}).blur(function() {

    isWindowFocus = false;

}), jQuery.cachedScript = function(url, options) {

    return options = $.extend(options || {}, {

        dataType: "script",

        cache: true,

        url: url

    }), jQuery.ajax(options);

}, drawMinimapNodes(), updateGameInfoDiv(), clearOldNodesData(), updateLbDiv(), updateScoreDiv(), $.cachedScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.8/js/min/perfect-scrollbar.jquery.min.js").done(function(dataAndEvents, deepDataAndEvents) {

    chatRoom.createScrollBar();

}), $.cachedScript('./jquery.toast.min.js').done(function(dataAndEvents, deepDataAndEvents) {

    var restoreScript;

    for (; restoreScript = toastQueue.shift();) {

        chatRoom.popup(restoreScript);

    }

});

$("#backgroundColor").minicolors({

    defaultValue: getLocalStorage("backgroundColor") || "#000000",

    change: function(v, start1) {

        setLocalStorage("backgroundColor", v);

        $("body").css("background-color", v);

    }

}), $("body").css("background-color", getLocalStorage("backgroundColor") || "#000000"), $("#borderColor").minicolors({

    defaultValue: getLocalStorage("borderColor") || "#ffffff",

    change: function(v, start1) {

        setLocalStorage("borderColor", v);

    }

}), $("#pelletColor").minicolors({

    defaultValue: getLocalStorage("pelletColor") || "#0849d4",

    change: function(v, start1) {

        setLocalStorage("pelletColor", v);

        $(".sender").css("color", v);

        $(".toast_sender").css("color", v);

        $("#div_lb .header").css("color", v);

    }

}), $(".sender").css("color", getLocalStorage("pelletColor") || "#0849d4"), $(".toast_sender").css("color", getLocalStorage("pelletColor") || "#0849d4"), $("#div_lb .header").css("color", getLocalStorage("pelletColor") || "#0849d4");