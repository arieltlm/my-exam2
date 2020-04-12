/**
 * 功能： 业务工具类
 * 作者： 
 * 日期： 2018/7/11
 */
class Helper {
    static getHash() {
        return window.location.hash
    }
    
    static getPathname() {
        return window.location.pathname
    }
    
    static exeCb(fnCb) {
        if (fnCb && typeof fnCb === 'function') {
            fnCb()
        }
    }
    
    static getStrLen(str) {
        // 计算字符串长度(英文占1个字符，中文汉字占2个字符)
        let len = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2
            } else {
                len++
            }
        }
        
        return len
    }
    
    static getStrByLen(str, len) {
        if (this.getStrLen(str) < len) {
            return str
        }
        const aRes = []
        let l = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                l += 2
            } else {
                l++
            }
            
            if (l <= len) {
                aRes.push(str.charAt(i))
            }
        }
        
        return aRes.join('')
    }
    
    static convertDate2FormatStr(oDate, format) {
        const o = {
            'M+': oDate.getMonth() + 1, // month
            'd+': oDate.getDate(), // day
            'h+': oDate.getHours(), // hour
            'm+': oDate.getMinutes(), // minute
            's+': oDate.getSeconds(), // second
            'q+': Math.floor((oDate.getMonth() + 3) / 3), // quarter
            S: oDate.getMilliseconds() // millisecond
        }
        let formatCopy = format
        
        if (/(y+)/.test(formatCopy)) {
            formatCopy = formatCopy.replace(
                RegExp.$1,
                (`${oDate.getFullYear()}`).substr(4 - RegExp.$1.length)
            )
        }
        
        for (const k in o) {
            if (new RegExp(`(${k})`).test(formatCopy)) {
                formatCopy = formatCopy.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length)
                )
            }
        }
        
        return formatCopy
    }
    
    static formatSdate(sDate) {
        // 默认sDate格式为：2015-10-09 20:45:35
        let date = sDate
        if (typeof date === 'string') {
            date = date.trim()
            
            if (date.length > 0) {
                return date.replace(/:\d{2}$/, '')
            }
        }
        
        return date
    }
    
    static makeActionCreator(type, ...argNames) {
        // 生成静态acionCreator
        return (...args) => {
            const action = { type }
            
            argNames.forEach((arg, index) => {
                action[arg] = args[index]
            })
            
            return action
        }
    }
    
    static createReducer(initialState, handlers) {
        // 生成reducer
        return (state = initialState, action) => {
            if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
                return handlers[action.type](state, action)
            }
            return state
        }
    }
    
    static decimal(e) {
        const nKeyCode = e.which
        const sValues = e.currentTarget.value
        
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105) || nKeyCode === 190 || nKeyCode === 110) {
            // 是否已包含小数点
            if (nKeyCode === 190 || nKeyCode === 110) {
                return sValues.includes('.')
            }
            
            return false
        }
        
        return false
    }
    
    static number(e) {
        // 数字，删除(8,46),方向（37-40）
        const nKeyCode = e.which
        if ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105)
            || (nKeyCode === 8) || (nKeyCode === 46) || (nKeyCode >= 37 && nKeyCode <= 40)) {
            return true
        } 
        return false
    }
    
    static mobileNumber(e) {
        const nKeyCode = e.which
        const target = e.currentTarget
        const sPhone = target.value
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105)) {
            return true
        }
        
        // 11位后数字不能输入数字,当未选中时禁止输入
        if (sPhone.length > 10 && (target.selectionStart === target.selectionEnd)
            && ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105))) {
            return false
        }
        
        return false
    }
    
    static validatePhone(sPhone) {
        const nLen = sPhone.length
        
        if (nLen !== 11 || (nLen === 11 && !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(sPhone))) {
            return false
        } 
        return true
    }
    
    static validateEmail(email) {
        return new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$').test(email)
    }
    
    static onKeyDown(e) {
        const nKeyCode = e.which
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105)) {
            return true
        }
        
        return false
    }
}

export default Helper
