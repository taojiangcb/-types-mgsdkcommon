declare namespace qg {
    function exitApplication(): void;
    function onShow(callback: () => void): void;
    function offShow(callback: () => void): void;
    function onHide(callback: () => void): void;
    function offHide(callback: () => void): void;

    interface SysInfoObj {success?:(data:SystemInfo)=>void,fail?:()=>void,complete?:()=>void}
    interface SystemInfo {
        brand:string	                //设备品牌
        manufacturer:string	            //设备生产商
        model:string	                //设备型号
        product:string	                //设备代号
        osType:string	                //操作系统名称
        osVersionName:string	        //操作系统版本名称
        osVersionCode:number	        //操作系统版本号
        platformVersionName:string	    //运行平台版本名称
        platformVersionCode:number	    //运行平台版本号
        language:string	                //系统语言
        region:string	                //系统地区
        screenWidth:number	            //屏幕宽
        screenHeight:number	            //屏幕高
        battery:number	                //当前电量，0.0 - 1.0 之间
        wifiSignal:number	            //wifi信号强度，范围0 - 4
    }

    function getSystemInfo(object:SysInfoObj);
    function getSystemInfoSync():SystemInfo;


    /**
     * 监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，vivo小游戏内所有音频会暂停。
     * @param callback 
     */
    function onAudioInterruptionBegin(callback: () => void): void

  

    /**
     * 获取异形屏缺口高度（竖屏时异形区域高度）同步版本 
     * # 参数
     */
    function getNotchHeightSync():number;


    interface AuthorizeParam {
        type: "code" | "token";	                //是	授权码模式为code，简化模式为token。
        redirectUri?: string;	                //Uri	否	重定向URI。
        scope?: "scope";                         //	否	申请的权限范围，目前只支持一种scope，假如不填则getProfile只返回openId。scope.baseProfile：获取用户基本信息。
        state?: string;                         //	否	可以指定任意值，认证服务器会原封不动地返回这个值。
        success?: (data:AuthorData)=>void;	    //否	成功回调。
        fail?:(data:any,code:number)=>void;	    //否	失败回调。
        complete?:()=>void;	                    //否	执行结束后的回调。
    }

    interface AuthorData {
        state:string	        //请求时同字段指定的任意值。
        code:string	            //授权码模式下可用，返回的授权码。
        accessToken:string      //简化模式下可用，返回的访问令牌。
        tokenType:string        //简化模式下可用，访问令牌类型。
        expiresIn:number        //简化模式下可用，访问令牌过期时间，单位为秒，如果通过其他方式设置，则此处可能为空。
        scope:string            //简化模式下可用，实际权限范围，如果与申请一致，则此处可能为空。
    }

    function authorize(param:AuthorizeParam):void;

    interface ProfileParam {
        token:string;
        success?:(data:ProfileData)=>void;
        fail?:(data:any,code:number)=>void;
        complete?:()=>void;
    }

    interface ProfileData {
        openid:string;	        //用户的openid，可作为用户的唯一标识。
        id:string;	            //用户的user id，可能为空。
        unionid:string;	        //用户在开放平台上的唯一标示符，可能为空。
        nickname:string;	    //用户的昵称，可能为空。
        avatar:string | object;	        //用户的头像图片地址，可能为空，按照分辨率组织，当只有一个分辨率时，可以使用default对应的图片地址。
    }

    //获得用户基本信息。
    function getProfile(param:ProfileParam):void;


    //========================广告=================================

    interface InterstitialAd  {
        show():void;
        load():void;
        onLoad(callback:()=>void):void;
        offLoad(callback?:()=>void):void;
        onClose(callback:()=>void):void;
        offClose(callback?:()=>void):void;
        onError(callback:(errMsg:string,errCode:number)=>void):void;
        offError(callback?:()=>void):void;
    }

    function createInterstitialAd({posId:string}):InterstitialAd;

    interface BannerAd {
        hide():void;
        show():void;
        destroy():void;
        onLoad(callback:()=>void):void;
        offLoad(callback?:()=>void):void;
        onClose(callback:()=>void):void;
        offClose(callback?:()=>void):void;
        onError(callback:(errMsg:string,errcode:number)=>void):void;
        offError(callback?:()=>void):void;
        onSize(callback:(width:number,height:number)=>void);
        offSize(callback?:()=>void):void;
        style?:any;
    }

    function createBannerAd({posId:string,style:any}):BannerAd;


    interface GetStorageOptions {
        /** 本地缓存中的指定的 key */
        key: string;

        default?:string;
        /** 接口调用的回调函数,res = {data: key对应的内容} */
        success: DataResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 从本地缓存中异步获取指定 key 对应的内容。
     */
    function getStorage(options: GetStorageOptions): void;


    interface SetStorageOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 需要存储的内容 */
        value: any | string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 将数据存储在本地缓存中指定的 key 中，
     * 会覆盖掉原来该 key 对应的内容，这是一个异步接口。
     */
    function setStorage(options: SetStorageOptions): void;



    /**
     * 清理本地数据缓存。
     */
    function clearStorage(): void;
    

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     *
     * @param {(Object)} key
     */
    function getStorageInfo(options: { success?: Function, fail?: Function, complete?: Function }): void;

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     *
     * @param {string} key
     * @returns {(Object | string)}
     */
    function getStorageSync(d:{key: string}): any | string;

      /**
     * 将 data 存储在本地缓存中指定的 key 中，
     * 会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     *
     * @param {string} key 本地缓存中的指定的 key
     * @param {(Object | string)} data 需要存储的内容
     */
    function setStorageSync(d:{key: string, value: any | string}): void;

     /**
     * 同步清理本地数据缓存
     */
    function clearStorageSync(): void;

    /**
     * @param d 支付
     * 属性	类型	必填	说明
        orderInfo	string	是	订单信息。支付服务器返回的订单json字符串
        success	Function	否	成功回调。
        fail	Function	否	失败回调。
        complete	Function	否	执行结束后的回调。
        success回调参数：Object data
        参数	类型	说明
        code	number	返回状态码。
        message	string	消息内容。
        result	string	支付结果。
        fail返回错误代码
        参数名	类型	说明
        data	string	消息内容。
        code	number	返回状态码。
     */
    function pay(d:{orderInfo:string,success?:(code:number,message:string,result:string)=>void,fail?:(code:number,data:string)=>void,cancel?:Function,complete?:()=>void})

    interface OrderInfo {
        respCode?:number,
        respMsg?:string,
        signMethod?:string // 签名方法 对关键信息进行签名的算法名称：MD5
        signature?:string // 签名信息对关键信息签名后得到的字符串 1，用于商户 验签，签名规则请参考附录 1.6.3 消息签名
        vivoSignature?:string // vivoSDK 签名 对关键信息签名后得到的字符串 2，用于调起 vivoSDK
        vivoOrderNumber?:string // 交易流水号 vivo 订单号
        orderAmount?:number // 交易金额 单位：元，币种：人民币，必须精确到小数 点后两位，如：1.01，100.00
        appId?:string // 应用 ID 开发者对应的 AppID
        orderTitle?:string // 商品标题
        orderDesc?:string // 商品描述
    }
}