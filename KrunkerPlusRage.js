// ==UserScript==
// @name         Krunker 1.9.6 RageHack
// @namespace    http://tampermonkey.net/
// @version      2.3.6
// @description  Rage-Hack for krunker.io 1.9.6
// @author       OVERHAX/THEGUY3ds + Hrt + ttap + Katistic
// @icon         https://www.google.com/s2/favicons?domain=krunker.io
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js
// @match        *://krunker.io/*
// @downloadURL  https://raw.githubusercontent.com/Katistic/Krunker-Hacks/KrunkerPlus/KrunkerPlus.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==

try {
    document.getElementById("instructions").style.color = "Blue";
    document.getElementById('instructions').innerHTML = "Hack by hrt + ttap + THEGUY3ds + Katistic.";
} catch {
    location.reload(true)
}

// Full Screen -- https://github.com/THEGUY3ds/KRUNKERPLUS/blob/89e9bd9cae68ea8ac824551b33f2f13e852f9829/KrunkerPlusReworked.js#L46
document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

function requestFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	};
};

if (document.fullscreenEnabled) {
	requestFullscreen(document.documentElement);
};

function read(url) {
    return new Promise(resolve => {
        fetch(url).then(res => res.text()).then(res => {
            return resolve(res);
        });
    });
};
// end

function read(url) {
    return new Promise(resolve => {
        fetch(url).then(res => res.text()).then(res => {
            return resolve(res);
        });
    });
};

// Aimdot
document.getElementById('aimRecticle').innerHTML = '<img id="recticleImg" src="https://i.redd.it/aa069tp99wh31.png">';

let shared_state = new Map(Object.entries({functions_to_hide: new WeakMap(), strings_to_hide: [], hidden_globals: [], init: false}));

let invisible_define = function(obj, key, value) {
    shared_state.get('hidden_globals').push(key);
    Object.defineProperty(obj, key, {
        enumberable: false,
        configurable: false,
        writable: true,
        value: value
    });
};

let conceal_function = function(original_Function, hook_Function) {
    shared_state.get('functions_to_hide').set(hook_Function, original_Function);
};

const original_toString = Function.prototype.toString;
let hook_toString = new Proxy(original_toString, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        let lookup_fn = shared_state.get('functions_to_hide').get(_this);
        if (lookup_fn) {
            return Function.prototype.apply.apply(target, [lookup_fn, _arguments]);
        }

        for (var i = 0; i < shared_state.get('strings_to_hide').length; i++) {
            ret = ret.replace(shared_state.get('strings_to_hide')[i].from, shared_state.get('strings_to_hide')[i].to);
        }
        return ret;
    }
});
Function.prototype.toString = hook_toString;
conceal_function(original_toString, hook_toString);

var distance, cnBSeen, canSee, pchObjc, objInstances, isYou, recoilAnimY, mouseDownL, mouseDownR, ammos, weaponIndex, inputs, getWorldPosition;
console.json = object => console.log(JSON.stringify(object, undefined, 2));
const defined = object => typeof object !== "undefined";


const e = document.getElementById('mapInfoHolder').children[3];//.getElementsByTagName('div')[3];
const n = document.createElement('form');
n.setAttribute('style', 'width: 600px; height: 60px; line-height: 90%;')
n.innerHTML = "<input type=\"checkbox\" name=\"RAGEHACK\" value=\"true\" id=\"RAGEHACK\"><label style=\"color: white; font-size: small;\" for=\"RAGEHACK\"> RAGEHACK (0) </label><br><label style=\"color: white; font-size: small;\"> Hack By Katistic -- Check out the repo <a href=\"http://gestyy.com/w7e9oW\" target=\"_blank\">HERE<a></label>"
document.getElementById('mapInfoHolder').replaceChild(n, e);


// Displace the trash
const trash = document.getElementById("aHolder")
trash.setAttribute('style', "position: absolute; bottom:5000px")

const original_encode = TextEncoder.prototype.encodeInto; // skidLamer
let hook_encode = new Proxy(original_encode, {
    apply: function(target, _this, _arguments) {
        let game = false;
        try {
            if (_arguments[0].length > 1000) {
                 cnBSeen = _arguments[0].match(/this\['recon']=!0x1,this\['(\w+)']=!0x1/)[1];
                 canSee = _arguments[0].match(/,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)[1];
                 pchObjc = _arguments[0].match(/\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)[1];
                 objInstances = _arguments[0].match(/\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[1];
                 recoilAnimY = _arguments[0].match(/\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[1];
                 mouseDownL = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[1];
                 mouseDownR = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[2];
                 getWorldPosition = _arguments[0].match(/\['camera']\['(\w+)']\(\);if/)[1];
                 didShoot = _arguments[0].match(/0x0,this\['(\w+)']=!0x1,this\['lodActive']=!0x1/)[1];
                 procInputRegex = _arguments[0].match(/this\['(\w+)']=function\((\w+),(\w+),\w+,\w+\){(this)/);
                 reloadRegex = _arguments[0].match(/{!\w+\['reloadTimer']&&\w+\['(\w+)']\[\w+\['(\w+)']]/);

                 procInputs = procInputRegex[1];
                 ammos = reloadRegex[1];
                 weaponIndex = reloadRegex[2];

                 game = true;
            }

         } catch (e) {
                // modify stack trace to hide proxy
                e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
                throw e;
        }
        if (game) TextEncoder.prototype.encodeInto = original_encode;

        return Function.prototype.apply.apply(target, [_this, _arguments]);
    }
});
TextEncoder.prototype.encodeInto = hook_encode;
conceal_function(original_encode, hook_encode);

const autos = "Assault RifleSubmachine GunMachine GunAkimbo UziFamas"
const toggles = {
    chams: true,
    ragehack: document.getElementById("RAGEHACK")
};

let current = 0;

function onTick(me, world, inputs, renderer) {
    const controls = world.controls;
    let aiming = false;

    current += 1

    if (current > Math.PI) {current = Math.PI * -1}

    // keybindings

    if (controls.keys[48]) {
        controls.keys[48] = 0
        toggles.ragehack.checked = !(toggles.ragehack.checked)
    }

    if (!toggles.ragehack.checked) {
        if (toggles.chams) {
            if (world && world.players) {
                world.players.list.map((entity, index, array) => {
                    if (defined(entity[objInstances]) && entity[objInstances]) {
                        entity[cnBSeen] = true;
                        for (let i = 0; i < entity[objInstances].children.length; i++) {
                            const object3d = entity[objInstances].children[i];
                            for (let j = 0; j < object3d.children.length; j++) {
                                const mesh = object3d.children[j];
                                if (mesh && mesh.type == "Mesh") {
                                    const material = mesh.material;
                                    material.alphaTest = 0;
                                    material.depthTest = true;
                                    material.fog = true;
                                    material.emissive.g = 0;
                                    material.wireframe = false;
                                };
                            };
                        };
                    };
                });
            };

            toggles.chams = false;
        };

        return
    };

    // Consts
    const players = world.players.list;
    const PI2 = Math.PI * 2;
    const input = {
        speed: 1,
        ydir: 2,
        xdir: 3,
        shoot: 5,
        scope: 6,
        jump: 7,
        crouch: 8,
        reload: 9,
        weapon: 10,
    };
    const consts = {
        "cameraHeight": 1.5,
        "playerHeight": 11,
        "cameraHeight": 1.5,
        "headScale": 2,
        "crouchDst": 3,
        "camChaseTrn": 0.0022,
        "camChaseSpd": 0.0012,
        "camChaseSen": 0.2,
        "camChaseDst": 24,
        "recoilMlt": 0.3,
        "nameOffset": 0.6,
        "ammos": 0x1c,
        "nameOffsetHat": 0.8,
    };

    let inView = (entity) => (null == world[canSee](me, entity.x, entity.y, entity.z)) && (null == world[canSee](renderer.camera[getWorldPosition](), entity.x, entity.y, entity.z, 10));
    let isFriendly = (entity) => (me && me.team ? me.team : me.spectating ? 0x1 : 0x0) == entity.team;

    //FUNCTIONS
    let getDistance3D = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var distX = fromX - toX,
            distY = fromY - toY,
            distZ = fromZ - toZ;
        return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
    };

    let getDistance = (player1, player2) => {
        return getDistance3D(player1.x, player1.y, player1.z, player2.x, player2.y, player2.z);
    };

    let getDirection = (fromZ, fromX, toZ, toX) => {
        return Math.atan2(fromX - toX, fromZ - toZ);
    };

    let getXDir = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var dirY = Math.abs(fromY - toY),
            dist = getDistance3D(fromX, fromY, fromZ, toX, toY, toZ);
        return Math.asin(dirY / dist) * (fromY > toY ? -1 : 1);
    }

    let getAngleDist = (start, end) => {
        return Math.atan2(Math.sin(end - start), Math.cos(start - end));
    };

    let isMoving = () => {
        if (controls.keys[controls.moveKeys[0]] || controls.keys[controls.moveKeys[1]] || controls.keys[controls.moveKeys[2]] || controls.keys[controls.moveKeys[3]]) {
            return true;
        };
        return false;
    };

    let isAuto = (gname) => {
        return autos.includes(gname)
    }

    let isEnemy = function(player) {return !me.team || player.team != me.team};
    let canHit = function(player) {return null == world[canSee](me, player.x3, player.y3 - player.crouchVal * consts.crouchDst, player.z3)};
    let isCloseEnough = function(player) {let distance = getDistance(me, player); return me.weapon.range >= distance && ("Shotgun" != me.weapon.name || distance < 70) && ("Akimbo Uzi" != me.weapon.name || distance < 100);};
    let calcAngleTo = function(player) {return getAngleDist(player.x3, player.y3 + consts.playerHeight - (consts.headScale + consts.hitBoxPad) / 2 - player.crouchVal * consts.crouchDst, player.z3);};

    // Aimbot
    let ty = controls.object.rotation.y;
    let tx = controls[pchObjc].rotation.x;
    let target = world.players.list.filter(x => {
        x[cnBSeen] = true;
        return defined(x[objInstances]) && x[objInstances] && x.active && !x.renderYou && inView(x) && !isFriendly(x)
    }).sort((p1, p2) => p1[objInstances].position.distanceTo(me) - p2[objInstances].position.distanceTo(me)).shift();
    if (target) {
        aiming = true;

        if (!isAuto(me.weapon.name) && me[didShoot]) {
            inputs[input.shoot] = 0;
        } else if (!me.aimVal) {
            inputs[input.shoot] = 1;
            inputs[input.scope] = 1;
        } else {
            inputs[input.scope] = 1;
        }

        let offset1 = ((consts.playerHeight - consts.cameraHeight) - (target.crouchVal * consts.crouchDst));
        let offset2 = consts.playerHeight - consts.headScale / 2 - target.crouchVal * consts.crouchDst;
        ty = getDirection(controls.object.position.z, controls.object.position.x, target.z, target.x);
        tx = getXDir(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x, target.y + offset2, target.z);
        tx -= consts.recoilMlt * me[recoilAnimY];

    } else {
        inputs[input.shoot] = controls[mouseDownL];
        inputs[input.scope] = controls[mouseDownR];
    }
    // silent aim
    inputs[input.xdir] = +(tx % PI2).toFixed(3);
    inputs[input.ydir] = +(ty % PI2).toFixed(3);

    if (!aiming && !isMoving()) {
        inputs[input.ydir] = (+(current % PI2).toFixed(3));
    }

    // Update-proof autoreload
    if (document.getElementById("ammoVal").innerHTML.split("<")[0] == "0 ") {
        controls.keys[controls.reloadKey] = 1
    } else {
        controls.keys[controls.reloadKey] = 0
    }

    // Chams and esp
    if (world && world.players) {
        world.players.list.map((entity, index, array) => {
            if (defined(entity[objInstances]) && entity[objInstances]) {

                entity[cnBSeen] = true;
                for (let i = 0; i < entity[objInstances].children.length; i++) {
                    const object3d = entity[objInstances].children[i];
                    for (let j = 0; j < object3d.children.length; j++) {
                        const mesh = object3d.children[j];
                        if (mesh && mesh.type == "Mesh") {
                            const material = mesh.material;
                            material.alphaTest = 1;
                            material.depthTest = false;
                            material.fog = false;
                            material.emissive.g = 1;
                            material.wireframe = true;
                        };
                    };
                };
            };
        });
    };

    toggles.chams = true;
};

let render = function(c, args) {
    if (args[3]) {
        if (!defined(args[3].procInputs)) {
            args[3].procInputs = args[3][procInputs]
            args[3][procInputs] = function () {
                const inputs = arguments[0];
                onTick(this, args[1], inputs, args[2]);
                return args[3].procInputs(...arguments);
            };
        };
    };
};

const original_fillRect = CanvasRenderingContext2D.prototype.fillRect;
let hook_fillRect = new Proxy(original_fillRect, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        render(_this, arguments.callee.caller.arguments);

        return ret;
    }
}); CanvasRenderingContext2D.prototype.fillRect = hook_fillRect;
conceal_function(original_fillRect, hook_fillRect);
