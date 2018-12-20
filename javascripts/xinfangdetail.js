/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(2),
      utf8 = __webpack_require__(0).utf8,
      isBuffer = __webpack_require__(3),
      bin = __webpack_require__(0).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

/**
 * 留言
 */
function leave_message(channel, agent_id, house_code, userCode, pageName) {
  const md5 = __webpack_require__(1);
  let transMessage = '/api/oversea/message'; // 留言验证码url
  let transVerifycode = '/api/oversea/sendVerifyCode'; // 短信验证码url
  let $send_verifycode_btn = $('.send_verifycode'); // 图形验证吗发送按钮
  let $pop = $('.pop_fixed.main');
  let $contents = $('.pop_content');
  const $contentsLeaveMsgSuccess = $('.pop_content.leave_message_success');
  const $imgVerifyLayerImg = $('.actVerImage'); // 图形验证码图片
  const $imgVerifyLayerImgBtn = $('.btn_confirm.send_verifycode_btn'); // 图形验证码确定按钮
  let $sendMessageBtn = $('.send_message'); // 发送留言
  let $closeIcon = $('.pop_fixed.main .close_btn');
  let $tel = $('.tel.input'); // 电话
  let $content = $('.leave_message .meassage.textarea'); // 留言内容
  let $errorTips = $('.error-tips');
  let $errorBox = $('.error-box');
  const isLianjia = window.location.hostname.match(/\.lianjia.com/g) ? true : false;
  const it = {
    init() {
      it.verifyLock = false;
      it.bind();
    },
    bind() {
      $send_verifycode_btn.on('click', it.evts.send_verifycode);
      $imgVerifyLayerImgBtn.on('click', it.evts.send_verifycodeOk);
      $imgVerifyLayerImg.on('click', it.evts.updateImgSrc);
      $sendMessageBtn.on('click', it.evts.send_message);
      $content.on('click', it.evts.defaultMessage);
      $closeIcon.on('click', it.evts.closeIcon);
      $tel.on('input', it.evts.telInput);
    },
    evts: {
      // 输入联系方式出现图形验证码
      telInput() {
          $(this).parents().find('.pic-verifycode-box').show();
      },
      tips(txt, show) {
          $errorTips.text(txt);
          if (show == 'show') {
              $errorBox.show();
          } else {
              $errorBox.hide();
          }
      },
      closeIcon() {
          $(this).parents('.pop_fixed.main').hide();
      },
      defaultMessage() {
          let txt = $content.attr('placeholder');
          $content.text(txt);
      },
      updateImgSrc() {
          // 点击图形验证码更新图片
          $imgVerifyLayerImg.attr({ src: '/api/generatePicture?_t=' + (new Date()).getTime() });
      },
      send_verifycode() {
          let mobileV = $(this).parents('.leave_message').find('.tel.input').val();
          let $imgVerifyLayerImgInput = $(this).parents('.leave_message').find('.input.pic-verifycode');
          let imgVerifyLayerImgInputV = $imgVerifyLayerImgInput.val();

          $(this).parents().find('.pic-verifycode-box').show();
          // 验证图形验证码－发送短信验证码
          if (!it.verifyLock) {
            if (mobileV == '' || mobileV.match(/^1[1-9]\d{9}$/) == null) {
              // alert('请填写正确的电话号码');
              it.evts.tips('请填写正确的电话号码', 'show');
              return false;
            }

            if (!imgVerifyLayerImgInputV) {
              it.evts.tips('请填写图形验证码', 'show');
              return false;
            }
          }

          let $this = $(this);
          $.ajax({
            type: 'get',
            url: transVerifycode,
            dataType: 'json',
            data: {
                mobile: mobileV,
                pic_verify_code: imgVerifyLayerImgInputV,
                businessChannel:"leaveMsg"
            },
            success: function(data) {
              if (data.code == 1) {
                it.evts.tips('', '');

                $imgVerifyLayerImgInput.val('');
                $imgVerifyLayerImgInput.blur();
                
                // 图形验证码隐藏
                $this.parents('.leave_message').find('.pic-verifycode-box').hide();
                it.evts.verifyButtonCountdown(60);
              } else if (data.code == 2) {
                it.evts.tips(data.errmsg, 'show');
                $imgVerifyLayerImgInput.val('');
                $imgVerifyLayerImg.attr({ src: '/api/generatePicture?_t=' + (new Date()).getTime() });
              } else if(data.code == 0){
                it.evts.tips(data.errmsg, 'show');
              }
            },
            fail: function() {
              it.evts.tips('验证码发送失败，请稍后再试', 'show');
            }
          });
        },
        verifyButtonCountdown(countdown) {
          // 验证码时间限制
          let send_verifycode = $('.send_verifycode');
          if (countdown > 0) {
            it.verifyLock = true;
            send_verifycode.attr('class', 'send_verifycode input-verifycode-disabled');
            send_verifycode.text(countdown + 'S后重发');

            setTimeout(function() {
                it.evts.verifyButtonCountdown(--countdown);
            }, 1000);
          } else {
            it.verifyLock = false;
            send_verifycode.attr('class', 'send_verifycode');
            send_verifycode.text('重新获取验证码');
          }
        },
        showSuccess() {
          $pop.show();
          $contents.hide();
          $contentsLeaveMsgSuccess.show();
          $errorBox.hide();
        },
        send_message() {
          // 埋点
          let digData = $(this).data("ulog-click");

          $('.pop_fixed').hide();
          let mobile = $(this).parents('.leave_message').find('.tel.input').val();
          let content = $(this).parents('.leave_message').find('.meassage.textarea').val();
          let name = $(this).parents('.leave_message').find('.name.input').val();
          let code = $(this).parents('.leave_message').find('.input-verifycode').val();
          let $agreement = $(this).parents('.leave_message').find('.checkbox.protocal-checkbox');
          // 验证通过并且发送留言

          if (!name) {
            it.evts.tips('请填写您的称呼', 'show');
            return false;
          } else if (mobile == '' || mobile.match(/^1[1-9]\d{9}$/) == null) {
            it.evts.tips('请填写正确的电话号码', 'show');
            return false;
          } else if (code == '') {
            it.evts.tips('请填写正确的验证码', 'show');
            return false;
          } else if ($agreement.length && !$agreement.prop('checked')) {
            if (!isLianjia) {
                it.evts.tips('需要同意《贝壳用户协议》', 'show');
            } else {
                it.evts.tips('需要同意《链家用户协议》', 'show');
            }
            return false;
          } else if (content == '') {
            content = $content.attr('placeholder');
          }

          let transData = {
            mobile,
            message: `用户${name}，联系方式${mobile}，在${pageName}给您留言：${content}。留言的网页地址为：${window.location.href}`,
            name,
            verify_code: code,
            channel,
            house_code,
            agent_id,
            userCode,
            sourceUrl: window.location.href
          }

          transData.subUuid = md5(JSON.stringify(transData))

          console.log(mobile, content, name, code, $agreement.prop('checked'));
          $.ajax({
            type: 'post',
            url: transMessage,
            dataType: 'json',
            data: transData,
            success: function(data) {
                if (data.code == 0) {
                  window.OCULOG_SEND_NEW && window.OCULOG_SEND_NEW(12921, digData);
                    it.evts.showSuccess();
                } else if (data.code == 1) {
                    it.evts.tips(data.msg, 'show');
                    it.evts.updateImgSrc();
                } else {
                    it.evts.tips('发送信息失败，请稍后再试', 'show');
                    it.evts.updateImgSrc();
                }
            },
            fail: function() {
                it.evts.tips('发送信息失败，请稍后再试', 'show');
            }
          });
        }
    }
  }
  it.init();
}

module.exports = {
  leave_message,
};


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/*
  海外搜索
*/

var suggest = __webpack_require__(5);
var search = $.AView.extend({
  initialize: function(opt) {
    var _this = this;
    _this._super(opt);
    var hotTemplate = $.template(opt.hotTemplate.html());
    var sugTemplate = $.template(opt.sugTemplate.html());
    var listEle = opt.elem;
    var searchInput = opt.searchInput;

    // 切换搜索频道
    let trigger = $('.overseas-nav .search .trigger');
    let formObj = $('.overseas-nav .search form');
    let formInput = $('.overseas-nav .search form #search-input');
    trigger.on('click', triggerChannel);

    function triggerChannel() {
      let txt = $(this).text();
      if ($(trigger[1]).css('display') == 'none') {
        $(trigger[1]).show();
      } else {
        $(trigger[1]).css('display', 'none');
      }
      if (txt == '新房') {
        $(trigger[0]).html('新房<i class="arrow">▼</i>');
        $(trigger[1]).html('二手房');
        formObj.attr('action', '/newhomes/us/rs');
        formObj.attr('data-action', '/newhomes/us/rs');
        formInput.attr('sugurl', '/api/newhomes/suggestion?keyword=');
      } else {
        formObj.attr('action', '/homes/us/rs');
        formObj.attr('data-action', '/homes/us/rs');
        formInput.attr('sugurl', '/api/suggestion?keyword=');
        $(trigger[0]).html('二手房<i class="arrow">▼</i>');
        $(trigger[1]).html('新房');
      }
    }

    opt.form.submit(function() {
      // 转义特殊字符／
      var searchInputVal = searchInput.val();
      var hasSpec = /\/+|\%+/.test(searchInputVal);
      searchInputVal = hasSpec ? searchInputVal.replace(/\/+|\%+/g, '') : searchInputVal;
      
      window.location.pathname = $(this).attr('action') + searchInputVal;
      return false;
    });
    new suggest({
      input: searchInput,
      hotTemplate: hotTemplate,
      sugTemplate: sugTemplate,
      sugContainer: listEle
    });
  }
});

module.exports = search;


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/*
海外 sug组件
params:el,template
*/
const { debounce } = __webpack_require__(6);

function suggest(option) {
  this.opt = {
    input: '',
    hotTemplate: '',
    sugTemplate: '',
    sugContainer: ''
  };
  $.extend(this.opt, option);
  this.isBusy = false;
  this.now = Date.now || function() {
    return +new Date;
  };
  this.searchTimer = this.now();
  this.bind();
}
suggest.prototype.bind = function() {
  var self = this;
  this.opt.input.bind('input propertychange focus', debounce(function() {
    if (!self.isBusy && (self.now() - self.searchTimer > 500)) {
      var key = $(this).val();
      var sugUrl = $(this).attr('sugUrl');
      var hotUrl = $(this).attr('hotUrl');
      if ($.trim(key) === '') {
        // getHotData({
        //   url: hotUrl
        // });
      } else {
        getSugData({
          url: sugUrl + key
        });
      }
    }
  }));
  var getHotData = function(obj) {
    $.ajax({
      type: 'get',
      url: obj.url,
      dataType: 'json',
      success: function(data) {
        self.isBusy = false;
        if (data && data.code == 1 && data.data.length) {
          self.opt.sugContainer.html(self.opt.hotTemplate.render({
            list: data.data
          }));
          self.opt.sugContainer.show();
        } else {
          self.opt.sugContainer.hide();
        }
      }
    });
  };
  var getSugData = function(obj) {
    $.ajax({
      type: 'get',
      url: obj.url,
      dataType: 'json',
      success: function(data) {
        self.isBusy = false;
        if (data && data.code == 1 && data.data.length) {
          self.opt.sugContainer.html(self.opt.sugTemplate.render({
            list: data.data
          }));
          self.opt.sugContainer.show();
          addNewUlog(data.data.length);
        } else {
          self.opt.sugContainer.hide();
        }
      }
    });
  };

  // 添加埋点
  function addNewUlog(sug_result) {
    let sug_condition = $('#search-input').val();
    let formObj = $('.overseas-nav .search form');
    let item_type = '';
    if (/^\/homes/.test(formObj[0].dataset.action)) {
      item_type = 'homes';
    } else {
      item_type = 'newhomes'
    }

    $('#sugBox').find('a').each(function() {
      let actionData = $(this).data('action');
      $(this).on('click', function() {
        window.OCULOG_SEND_NEW && window.OCULOG_SEND_NEW('12038', { 'action': { 
          sug_condition, 
          sug_result: actionData.sug_result,
          item_type,
          nation: actionData.nation,
          element_title: actionData.element_title,
          element_index: actionData.element_index
        } });
      });
      
      window.OCULOG_SEND_NEW && window.OCULOG_SEND_NEW('12032', { 'action': { 
        sug_condition, 
        sug_result: actionData.sug_result, 
        item_type, 
        nation: actionData.nation
      } });
    });
  }
};
module.exports = suggest;


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var { picSlide } = __webpack_require__(56);
var { tabToggle } = __webpack_require__(57);
var { leave_message } = __webpack_require__(14);
var Search = __webpack_require__(4);
const { baiduMapInit } = __webpack_require__(58);

function init() {
    function search() {
        var $search = $('.search');
        var $form = $search.find('form');
        $search
            .mouseenter(function() {
                $form.addClass('active');
            })
            .click(function(e) {
                e.stopPropagation();
            });
        $search.find('button').click(function() {
            $form.submit();
        });
        $(document).click(function() {
            $('#sugBox').hide();
            $form.removeClass('active');
        });

        var _thisEl = $("body");
        $(_thisEl).append('<script type="text/template" id="hotTemplate"></script>');

        _thisEl.find('#hotTemplate').html(`
        <li class="hot-search-title">热词搜索</li>
        <%for(var i=0; i<list.length; i++){%>
            <li><a href="<%=list[i].url%>"><%=list[i].string%></a></li>
        <%}%>
        `);

        $(_thisEl).append('<script type="text/template" id="sugTemplate"></script>');
        _thisEl.find('#sugTemplate').html(`
        <%for(var i=0; i<list.length; i++){%>
            <li>
            <a href="/<%=list[i].searchType%>/<%=list[i].nationSN%>/<%=list[i].short_name%>" class="clear">
                <span class="left stateName">
                <%=list[i].name%>(<%=list[i].english_name%>
                    <%if(list[i].abbr != "" ) {%>
                    <%=list[i].abbr%>
                    <%}%>
                    <%if(list[i].alias != "" ){%>
                    <%=list[i].alias%>
                    <%}%>
                    )
                </span>
                <span class="right sell"><%=list[i].count ? list[i].count : 0%>套在售</span>
            </a>
            </li>
        <%}%>
        `);
        new Search({
            el: 'body',
            hotTemplate: $('#hotTemplate'),
            sugTemplate: $('#sugTemplate'),
            elem: $('#sugBox'),
            searchInput: $('#search-input'),
            form: $('#searchForm')
        });
    }

    search();

    /**
     * 图片滑动
     */
    picSlide();

    /**
     * 项目埋点tab切换
     */
    let maidianTabs = $('.maidian-tab');
    let maidianTabsContent = $('.maidian-content');

    tabToggle(maidianTabs, maidianTabsContent);

    /**
     * 主力户型tab切换
     */
    let housetypeTabs = $('.housetype-tab');
    let housetypeTabsContent = $('.housetype-box');

    tabToggle(housetypeTabs, housetypeTabsContent, true);

    /**
     * 留言
     */
    function xinfangLeaveMessage() {
        let $dom = $('#housecode');
        let housecode = $dom.data('housecode') || 0;
        // 客服 agentid为0，userCode传值； 顾问 agentid传值，userCode为0
        let agentid = $dom.data('agentid') || 0;
        let userCode = $dom.data('usercode') || 0;
        leave_message('xinfang', agentid, housecode, userCode, '新房详情页');
    }
    xinfangLeaveMessage();

    /**
     * tab留言
     */
    function tab_leave_message() {
        let $leaveMessageBtn = $('.leave-message-btn');
        let $leaveMessageTag = $('.leave_message_tag');
        let $popFixed = $('.pop_fixed.main');
        let $popContents = $('.pop_content');
        let $popLeaveMessage = $('.pop_content.leave_message');
        let $popFixedMessage = $('.pop_fixed.main .pop_fixed_message.pop_fixed');

        $leaveMessageBtn.on('click', function() {
            leaveMessage();
        });
        $leaveMessageTag.on('click', function() {
            leaveMessage();
        });

        function leaveMessage() {
            $popFixed.show();
            $popFixedMessage.hide();
            $popContents.hide();
            $popLeaveMessage.show();
        }
    }
    tab_leave_message();

    /**
     * 弹窗
     */
    function popActions() {
        let $submitBtn = $('.pop_btn.close');
        let $closeBtn = $('.pop_close');
        let $pop = $('.pop_fixed.main');
        let $viewOpening = $('.view-more.view-opening-btn');
        let $openingDom = $('.pop_content.opening');
        let $contents = $('.pop_content');


        $closeBtn.on('click', hide);
        $submitBtn.on('click', hide);
        $viewOpening.on('click', function() {
            show();
            $contents.hide();
            $openingDom.show();
        });

        function hide() {
            $pop.hide();
        }

        function show() {
            $pop.show();
        }

    }
    popActions();

    /**
     * 滚动tab切换
     */
    function scrollTabFixed() {
        let $target = $('.main-tab');
        let $items = $('.main-tab .main-tab-item a');
        let itemsOffset = [];
        let $topItem = $('#programInfo');
        let $rightBox = $('.right-fixed');
        let $jingjiren = $('.jingjiren');
        let $jingjirenWrap = $('.jingjiren-wrap');

        let $jingjirenOffset = $jingjiren.offset().top;


        // 获取每个链接对应的url值
        $items.each((i, el) => {
            let offset = $(el.hash).offset().top;
            itemsOffset = itemsOffset.concat({
                'id': el.hash,
                offset
            });
        });

        let scrollHandler = function() {
            let $boxBottom = $('.box-bottom');
            let $boxBottomOffset = $boxBottom.offset().top;

            // window滚动的高度 > dom相对于顶部高度,除去固定条高度64,缓冲高度20
            let scrolledTop = document.scrollingElement.scrollTop + 64 + 20;

            if ($topItem.offset().top < scrolledTop) {
                $target.show();
            } else {
                $target.hide();
            }
            // 经纪人模块置顶，添加fixed定位
            if (scrolledTop >= $jingjirenOffset && scrolledTop <= ($boxBottomOffset - $rightBox.height())) {
                $rightBox.addClass('fixed');
            } else {
                $rightBox.removeClass('fixed');
                $jingjirenWrap.show();
            }

            // 位置周边之后，tab展示右上角经纪人信息
            if (scrolledTop >= ($boxBottomOffset - $rightBox.height())) {
                $jingjirenWrap.show();
            } else {
                $jingjirenWrap.hide();
            }

            itemsOffset.forEach((el, i) => {
                if (scrolledTop >= el.offset) {
                    $items.removeClass('active');
                    $($items[i]).addClass('active');
                }
            });
        }

        window.addEventListener('scroll', scrollHandler);
    }
    scrollTabFixed();

    /**
     * 户型详情
     */
    function houseTypeAction() {
        let $housetypeBox = $('.pop_content.housetype .housetype_box');

        $housetypeBox.each((i, el) => {
            // 前进后退按钮
            let $nextBtn = $('.pop_content.housetype .housetype_box.'+i+' .picbox_layout-btn.next');
            let $prevBtn = $('.pop_content.housetype .housetype_box.'+i+' .picbox_layout-btn.prev');

            // 图片选择器
            let $picWrap = $('.pop_content.housetype .housetype_box.'+i+' .picbox_wrap');
            let $picUnits = $('.pop_content.housetype .housetype_box.'+i+' .picbox_layout-preview-unit');

            let maxLength = $picUnits.length;
            let curIndex = 0;

            $prevBtn.on('click', prev);
            $nextBtn.on('click', next);

            function next() {
                if (curIndex < maxLength - 1) {
                    curIndex++;
                    $picWrap.css('transform', `translate(${-360*curIndex}px)`);
                }
            }

            function prev() {
                if (curIndex > 0) {
                    curIndex--;
                    $picWrap.css('transform', `translate(${-360*curIndex}px)`);
                }
            }
        });


        let houseTabs = $('.pop_content.housetype .housetype_tab');

        tabToggle(houseTabs, $housetypeBox);

        let $houseClickItems = $('.housetype-content .housetype-box');
        let $popFixed = $('.pop_fixed.main');
        let $popContents = $('.pop_fixed .pop_content');
        let $popContenHousetype = $('.pop_fixed .pop_content.housetype');
        $houseClickItems.on('click', function() {
            $popFixed.show();
            $popContents.hide();
            $popContenHousetype.show();
        });

        // 点击某户型 弹窗显示某户型
        $houseClickItems.each((i, el) => {
            $(el).on('click', () => {
                houseTabs.removeClass('active');
                $(houseTabs[i]).addClass('active');

                $housetypeBox.removeClass('active');
                $($housetypeBox[i]).addClass('active');

            });
        });
    }
    houseTypeAction();
}

init();
baiduMapInit();


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

/**
 * 图片滑动
 */
function picSlide() {
    // 前进后退按钮
    let prevBtn = $('.picbox.small .picbox_layout-btn.prev');
    let nextBtn = $('.picbox.small .picbox_layout-btn.next');
    // 图片容器
    let picBox = $('.picbox.small .picbox_layout-preview-box');
    // 缩略图容器
    let picResItem = $('.picbox.small .picbox_layout-preview-unit > img');
    // 图片数据
    let piclist = $('.picbox.small').data('piclist');
    // 图片前缀
    let imgCdn = $('.picbox.small').data('imgcdn');
    let picContainer = $('.picbox.small .picbox_container img');
    let picType = $('.picbox.small .picbox_container-type');
    slide(prevBtn, nextBtn, picBox, picResItem, piclist, imgCdn, picContainer, picType);

    bigPic()
}
/**
 * 
 * @param {前进后退按钮} prevBtn 
 * @param {前进后退按钮} nextBtn 
 * @param {图片容器} picBox 
 * @param {缩略图容器} picResItem 
 * @param {图片数据} piclist 
 * @param {图片前缀} imgCdn 
 * @param {当前图片容器} picContainer 
 * @param {当前图片类型} picType 
 */
function slide(prevBtn, nextBtn, picBox, picResItem, piclist, imgCdn, picContainer, picType, curIndex) {
    curIndex = curIndex || 0;
    
    let maxLength = piclist.length - 1;
    // 默认选择当前图片
    toCurPic();

    // 前进后退
    prevBtn.on('click', prevAction);
    nextBtn.on('click', nextAction);

    // 点击跳转
    picResItem.each((key, el) => {
        $(el).on('click', () => {
            curIndex = key;
            toCurPic();
        });
    });

    function prevAction() {
        console.log('curIndex', piclist[curIndex]);
        if (curIndex <= 0) return;
        curIndex--;
        // 设置图片url和type
        setPicUrl(piclist[curIndex].name, piclist[curIndex].type, curIndex);

        if (curIndex >= 2) {
            picBox.css('transform', `translate(${-129 * (curIndex - 2)}px)`);
        }
    }
    
    function nextAction() {
        console.log('curIndex', curIndex);
        if (curIndex >= maxLength) return;
        curIndex++;
        // 设置图片url和type
        setPicUrl(piclist[curIndex].name, piclist[curIndex].type, curIndex);

        if (curIndex >= 2) {
            picBox.css('transform', `translate(${-129 * (curIndex - 2)}px)`);
        }
    }

    function setPicUrl(src, type, curIndex) {
        picContainer.attr('src', `${imgCdn}${src}`);
        picType.text(type);

        $(picResItem).removeClass('selected');

        // 添加当前selected样式
        $(picResItem[curIndex]).addClass('selected');
    }

    function toCurPic() {
        // 设置图片url和type
        setPicUrl(piclist[curIndex].name, piclist[curIndex].type, curIndex);

        if (curIndex >= 2) {
            picBox.css('transform', `translate(${-129 * (curIndex - 2)}px)`);
        }
    }
}

function bigPic() {
    let picContainer = $('.picbox .picbox_container img');
    // 大图预览
    let $picboxIcon = $('.picbox_fixed .picbox_icon');
    let $picBoxFixed = $('.picbox_fixed');

    picContainer.on('click', bigPreview);
    function bigPreview() {
        let bigPicBox = $('.picbox_fixed');
        findSelected();
        bigPicBox.show();
    }

    // 判断当前selected图片。
    function findSelected() {
        let picResItem = $('.picbox.small .picbox_layout-preview-unit > img');

        picResItem.each((key, el) => {
            if ($(el).hasClass('selected')) {

                // 前进后退按钮
                let prevBtn2 = $('.picbox_fixed .picbox .picbox_layout-btn.prev');
                let nextBtn2 = $('.picbox_fixed .picbox .picbox_layout-btn.next');
                // 图片容器
                let picBox2 = $('.picbox_fixed .picbox .picbox_layout-preview-box');
                // 缩略图容器
                let picResItem2 = $('.picbox_fixed .picbox .picbox_layout-preview-unit > img');
                // 图片数据
                let piclist2 = $('.picbox_fixed .picbox').data('piclist');
                // 图片前缀
                let imgCdn2 = $('.picbox_fixed .picbox').data('imgcdn');
                let picContainer2 = $('.picbox_fixed .picbox .picbox_container img');
                let picType2 = $('.picbox_fixed .picbox .picbox_container-type');
                slide(prevBtn2, nextBtn2, picBox2, picResItem2, piclist2, imgCdn2, picContainer2, picType2, key);
            };
        });
    }

    $picboxIcon.on('click', function() {
        $picBoxFixed.hide();
    });
}


module.exports = {
    picSlide
}

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

/**
 * tab切换
 */
function tabToggle(tabs, tabsContent, isAll) {
    isAll = isAll || false;

    // 第一个tab添加active
    $(tabs[0]).addClass('active');

    tabs.each((i, item) => {
        if (isAll) {
            $(item).on('click', () => {
                let curIndex = i - 1;
            
                // 所有tabs去除active类
                tabs.removeClass('active');
                $(item).addClass('active');

                // 全部按钮时，所有模块展示；否则展示当前模块
                if (curIndex == -1) {
                    tabsContent.addClass('active');
                } else {
                    tabsContent.removeClass('active');
                    $(tabsContent[curIndex]).addClass('active');
                }
            });
        } else {
            $(item).on('click', () => {
                // 所有tabs去除active类
                tabs.removeClass('active');
                tabsContent.removeClass('active');
    
                // 当前tab添加active类
                $(item).addClass('active');
                $(tabsContent[i]).addClass('active');
            });
        }
    });
}


module.exports = {
    tabToggle
}

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

const baiduMapInit = () => {
  // make eslint silent
  const { $, BMap, BMapLib, BMAP_ANCHOR_TOP_LEFT, INFOBOX_AT_TOP, cdnUrlBase } = window;
  if (!(BMap && window.currentPosition)) {
    return;
  }

  const map = new BMap.Map('bmap');
  const zoomLevel = 14;
  // window.currentPosition is defined in template
  const location = window.currentPosition;
  const centerPoint = new BMap.Point(location.lng, location.lat);
  const convertor = new BMap.Convertor();

  let defaultMarker = null;

  // eslint-disable-next-line func-style
  function ResetZoomCenterController() {
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    // align with NavigationControl
    this.defaultOffset = new BMap.Size(10 + (44 - 32) / 2, 10);
  }

  ResetZoomCenterController.prototype = new BMap.Control();
  ResetZoomCenterController.prototype.initialize = map => {
    const div = document.createElement('div');
    div.className += 'current-location-controller';
    const innerIcon = document.createElement('div');
    innerIcon.className += 'icon';
    div.appendChild(innerIcon);
    div.addEventListener('click', () => {
      map.reset();
    });
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
  };

  const translateCallback = data => {
    if (data.status !== 0) {
      return;
    }
    const defaultIcon = new BMap.Icon(
      `${cdnUrlBase}/pc/css/img/haiwai/bmap-icon/location@3x.png`,
      new BMap.Size(15, 24),
      {
        imageSize: new BMap.Size(15, 24),
      },
    );
    defaultMarker = new BMap.Marker(data.points[0], { icon: defaultIcon });
    const navController = new BMap.NavigationControl({
      // vertical align with geo location controller
      offset: new BMap.Size(10, 10 + 32 + 10),
    });
    const resetZoomCenterController = new ResetZoomCenterController(map);
    map.addOverlay(defaultMarker);
    map.centerAndZoom(data.points[0], zoomLevel);
    map.addControl(navController);
    map.addControl(resetZoomCenterController);
    map.enableScrollWheelZoom(true);
  };

  const PoiLocationId = location => `poi-${location.lng}-${location.lat}`;
  const renderPOIDetail = (poi, distance, selectedIconSrc, unselectedIconSrc) => `
    <div class="poi" id="${PoiLocationId(poi.location)}">
      <div class="icon">
        <img
          data-selected-icon-src="${selectedIconSrc}"
          data-unselected-icon-src="${unselectedIconSrc}"
          src="${unselectedIconSrc}"
        >
      </div>
      <div class="right">
        <div class="detail">
          <div class="name">${poi.name}</div>
          <div class="address">${poi.address}</div>
        </div>
        <div class="distance">
          相距${distance}米
        </div>
      </div>
    </div>
  `;

  // conver Google Map coordinates to Baidu Map coordinates
  convertor.translate([centerPoint], 3, 5, translateCallback);

  const localSearchRequest = type =>
    new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/api/oversea/searchNearBy',
        data: {
          location: `${location.lat},${location.lng}`,
          radius: 3000,
          type: type,
        },
        success: data => resolve(data),
        error: error => {
          reject(error);
        },
      });
    });

  let lastOpenedInfoBox = null;
  const showMarkerInfobox = (marker, infoBox) => {
    if (lastOpenedInfoBox && lastOpenedInfoBox !== infoBox) {
      lastOpenedInfoBox.close();
    }
    infoBox.open(marker);
    lastOpenedInfoBox = infoBox;
  };
  const loadingContainer = $('.nearyby-container .loading-container');
  const searchResultContainer = $('.nearyby-container .results-container');
  const searchNearBy = async (keyword, name, markerIconSrc, selectedIconSrc, unselectedIconSrc) => {
    loadingContainer.addClass('loading');
    if (lastOpenedInfoBox) {
      lastOpenedInfoBox.close();
      lastOpenedInfoBox = null;
    }
    map.getOverlays().forEach(overlay => {
      if (overlay !== defaultMarker) {
        overlay.removeEventListener('click');
        map.removeOverlay(overlay);
      }
    });
    try {
      const res = await localSearchRequest(keyword);
      if (res.status !== 0) {
        throw Error('服务器出错了');
      }

      loadingContainer.removeClass('loading');
      if (res.results.length === 0) {
        searchResultContainer.html(`<div class="exception">附近没有找到${name}</div>`);
        return;
      }

      const icon = new BMap.Icon(markerIconSrc, new BMap.Size(30, 34), { imageSize: new BMap.Size(30, 34) });
      const poiListHtml = [];
      res.results.forEach(poi => {
        const distance = Math.round(map.getDistance(centerPoint, poi.location));
        poiListHtml.push(renderPOIDetail(poi, distance, selectedIconSrc, unselectedIconSrc));
        const infoBoxHtml = `<div class="title">${poi.name}</div><div class="content">相距 ${distance} 米</div>`;
        const infoBox = new BMapLib.InfoBox(map, infoBoxHtml, {
          align: INFOBOX_AT_TOP,
          boxClass: 'info-box',
          enableAutoPan: true,
        });
        const point = new BMap.Point(poi.location.lng, poi.location.lat);
        const marker = new BMap.Marker(point, { icon });
        marker.__id__ = PoiLocationId(poi.location);
        marker.__infoBox = infoBox;
        marker.addEventListener('click', () => showMarkerInfobox(marker, infoBox));
        map.addOverlay(marker);
      });
      searchResultContainer.html(poiListHtml.join(''));
    } catch (error) {
      loadingContainer.removeClass('loading');
      searchResultContainer.html('<div class="exception">出错了</div>');
    }
  };

  // close any infoBox when click blank space on map
  map.addEventListener('click', e => {
    // click blank space, close infoBox if it opened
    if (e.type === 'onclick' && !e.overlay && lastOpenedInfoBox) {
      lastOpenedInfoBox.close();
      lastOpenedInfoBox = null;
    }
  });

  $('.nearyby-container .nearby-tab').bind('click', function() {
    const btn = $(this);
    if (btn.hasClass('selected')) {
      return;
    }
    $('.nearyby-container .nearby-tab.selected').removeClass('selected');
    btn.addClass('selected');

    const keyword = btn.attr('data-keyword');
    const markerIconSrc = btn.attr('data-marker-icon-src');
    const name = btn.attr('data-name');
    const selectedIconSrc = btn.attr('data-selected-icon-src');
    const unselectedIconSrc = btn.attr('data-unselected-icon-src');
    searchNearBy(keyword, name, markerIconSrc, selectedIconSrc, unselectedIconSrc);
  });

  $('.nearyby-container .results-container').on('click', '.poi', function() {
    const me = $(this);
    if (me.hasClass('selected')) {
      return;
    }
    const oldPoi = $('.nearyby-container .results-container .poi.selected');
    if (oldPoi.length > 0) {
      oldPoi.removeClass('selected');
      const icon = oldPoi.find('img');
      icon.attr('src', icon.attr('data-unselected-icon-src'));
    }
    me.addClass('selected');
    const icon = me.find('img');
    icon.attr('src', icon.attr('data-selected-icon-src'));
    // open infoBox for this poi
    const markers = map.getOverlays().filter(marker => marker.__id__ === me.attr('id'));
    if (markers.length > 0) {
      const marker = markers[0];
      showMarkerInfobox(marker, marker.__infoBox);
      const markerPosition = map.pointToOverlayPixel(marker.getPosition());
      map.panTo(markerPosition);
    }
  });

  $('.nearyby-container .nearby-tab:first-child').click();
};

module.exports = { baiduMapInit };


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

exports.debounce = (fn, interval = 300) => {
    let timer = null;
    // 使用箭头函数(this指向当前debounce) 和 匿名函数(this指向当前函数作用域) 作用域不同
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    }
}

/***/ })

/******/ });
//# sourceMappingURL=xinfangdetail.js.map