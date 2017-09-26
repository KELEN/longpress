;(function () {
    function LongPress(el, opts, cb) {

        var defOpts = {
            interval: 1000	// 1s触发
        };

        this.beforeClick = false;	//	mousemove之前是否点击
        this.longPressTimer = null;	//  定时器
        this.mouseMoveCounter = 0;	//  桌面端鼠标移动计数
        this.timeCounter = 0;		//  时间计数器

        // 扩展选项
        defOpts = extend(defOpts, opts);

        this.handleTouchStart = function (e) {
            e.preventDefault();
            var _this = this;
            _this.beforeClick = true;
            _this.mouseMoveCounter = 0;
            _this.timeCounter = 0;
            _this.longPressTimer = setInterval(function() {
                // cb();
                _this.timeCounter += 1;

                if (typeof defOpts.onProgress === "function") {
                    defOpts.onProgress.call(_this, _this.timeCounter / (defOpts.interval / 100));
                }

                if (_this.timeCounter >= defOpts.interval / 100) {
                    typeof defOpts.onComplete === "function" && defOpts.onComplete.call(_this);
                    clearInterval(_this.longPressTimer);
                }
            }, 100);
        };

        this.handleTouchMove = function (e) {
            if (this.beforeClick) {
                clearInterval(this.longPressTimer);
            }
        };

        this.handleMouseMove = function (e) {
            if (this.beforeClick) {
                this.mouseMoveCounter += 1;
                if (this.mouseMoveCounter > 1) {
                    clearInterval(this.longPressTimer);
                }
            }
        };

        this.handleTouchEnd = function (e) {
            this.beforeClick = false;
            this.mouseMoveCounter = 0;
            this.longPressTimer && clearInterval(this.longPressTimer)
        };

        /**
         * 扩展对象
         * @param obj
         * @param obj2
         * @returns obj
         */
        function extend (obj, obj2) {
            for (var i in obj2) {
                if (obj2.hasOwnProperty(i)) {
                    if (typeof obj2[i] === "object") {
                        obj[i] = extend(obj[i] || {}, obj2[i])
                    } else {
                        obj[i] = obj2[i];
                    }
                }
            }
            return obj;
        }

        el.addEventListener("touchstart", this.handleTouchStart, false);
        el.addEventListener("mousedown", this.handleTouchStart, false);

        el.addEventListener("touchmove", this.handleTouchMove, false);
        el.addEventListener("mousemove", this.handleMouseMove, false);

        el.addEventListener("touchend", this.handleTouchEnd, false);
        el.addEventListener("mouseup", this.handleTouchEnd, false);
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = LongPress;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return LongPress;
        })
    } else {
        this.LongPress = LongPress;
    }
})();