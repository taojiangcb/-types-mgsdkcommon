

declare namespace mgsdk {

    /** 初始化 sdk 的配置 */
    type PlatInitOps = {
        platId: number,                              //平台id
        gameId: number,                              //平台游戏id
        success: (res?: any) => void,                   //平台 登录成功之后回调
        fail: (msg?: string) => void                    //平台 登录失败时候回调

        libUrl?: string,                             //第三方sdk 如果有先要加载  第三方h5 有用
        outLog?: boolean,                            //是否调试 log 的日志显示
        mode?: 0 | 1 | 2,                                //0开发模式,1测试服务，2线上服务
        sdk_server_deg: string,                      //开发服务的地址
    }

    /**生命周期配置 */
    type PlatLifeOpts = {
        //onReady?:((res?: any) => void);                  //生命周期函数--监听页面加载 
        onShow?:((res?: iLaunchData) => void);                  //应用到前台时处理
        onHide?:((res?: any) => void);                  //应用到后台时处理
        onError?:((error?: any) => void);               //平台捕获到异常时处理
        //onExit?:(() => void);                          //退出时处理
    }

    /** 运行时获取的启动参数 */
    interface iLaunchData {
        /**
         * 来源的场景值
         *  微信平台：1020	 公众号 profile            页相关小程序列表 
         *       1035	公众号自定义菜单            来源公众号
         *       1036	App 分享消息卡片	       来源App
         *       1037	小程序打开小程序	        来源小程序
         *       1038	从另一个小程序返回  	    来源小程序
         *       1043	公众号模板消息	            来源公众号
         */
        scene?: number;
        /**启动小游戏的 query 参数 */
        query?: any;
        /**  */
        shareTicket?: string;
        /**来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 */
        referrerInfo?: {
            appId?: string,             //来源小程序、公众号或 App 的 appId
            extraData?: any;	           //object	来源小程序传过来的数据，scene=1037或1038时支持
        }
    }

    interface PlatLoginParams {
        platUser: iPlatUser,                             //登录的用户
        platId: number,
        gameId: number,
        fromChannel: string,                             //来自渠道 wx 平台对应 secne 启动小游戏的场景值
        fromUser: string,                                //来自哪个用户
        fromAppId: string,                               //来自哪个应用
    }

    interface iSetting {
        canPay: boolean;                     //有充值？
        canViedo: boolean;                   //有视频广告?
        canBanner: boolean;                  //有banner广告？
        canShare: boolean;                   //可以分享?
    }

    interface iPlatUser {
        id?: string;                         //平台id
        naickName?: string;                  //昵称
        avatar?: string;                     //头像
        openId?: string;                     //平台的 openId
        skey?: string;                       //
        loginToken?: string;                 //平台登录的 tokeng 发放钻石用的
        code?: string;
        content?: any;
    }

    /**sdk 数据定义 **/
    interface iDefine {
        platId: number;
        gameId: number;
        setting: iSetting;
        user: iPlatUser;
        sdk_server_local: string;                        //本地平台服务地址
        mode: 0 | 1 | 2;                                 //sdk 运行的模式 0本地开发，1线上测试，2线上正式
        sdk_server_url: string;                          //平台服务的地址
        cdnUrl?: string;
    }

    interface iPlat {
        login(opts: iLoginResponseOpts);                        //登录平台
        getLaunchOptionsSync(): iLaunchData                     //获取启动参数
        cliConfig?: {                                           //从服务端获取到的 配置信息 
            version?: { o: string, t: string, l: string }       //o 线上版本，t 测试版本, l 最小版本
        }
    }

    interface iNative {
        /** 加载第三方h5 lib 库 */
        requireLib(url: string, success?: () => void, fail?: () => void);
        /**网络请求 */
        httpRequst(any: IRequestOptions);
        /**倒计时 */
        timeOnce(delay: number, caller: any, method: Function, ...args);
        clearTimeOnce(timer: any);
        /** 本地数据处理 */
        setItem(key: string, value: any): void;
        /** 取出本地数据 */
        getItem(key: string): any;
        /**获取平台系统信息 */
        getSystemInfoAsync(): iSystemInfo;
    }

    interface iSdkLife {

        onShow(callBack?:(res?: mgsdk.iLaunchData) => void);                  //应用到前台时处理
        offShow(callFunc: Function): void;
        
        onHide(callBack?:(res?: any) => void);                  //应用到后台时处理
        offHide(callFunc: Function): void;
        
        onError?(callBack?:(error?: any) => void);               //平台捕获到异常时处理
        offError?(callFunc: Function): void;
        
        //onExit?(callBack?:() => void);                           //退出时处理
        //offExit?(callFunc: Function): void;

        //onReady?(callBack?:(res?: any) => void);                 //生命周期函数--监听页面加载 
        //offReady?(callFun: Function): void;
    }


    interface iShareMenuOpts {
        withShareTicket?:boolean,
        success?: Function, 
        fail?: Function, 
        complete?: Function
    }

    interface iShareRespose extends wx.ShareRespose {}

    interface iShareContext {
        title?: string, 
        imageUrl?: string, 
        query?: string, 
        imageUrlId?:string,
        success?:(res?:iShareRespose)=>void, 
        fail?: Function, 
        complete?: Function 
    }


    interface iShare {
        showShareMenu?(opts:iShareMenuOpts);
        hideShareMenu?(opts:iShareMenuOpts);

        shareAppMessage?(obj:iShareContext);
        onShareAppMessage?(callBack:()=>iShareContext);

        offShareAppMessage?(callBack:()=>void);
    }

    interface iSystemInfo extends wx.SystemInfo {
        isIos?: boolean
    }

    /**
     * sdk 初始化
     * @param opts 
     * @param lifeOpts 
     * @param platSetting 
     */
    function init(opts: PlatInitOps, lifeOpts?: PlatLifeOpts, platSetting?: iSetting);

    var sdkLife: iSdkLife;
    var initOpts: PlatInitOps;
    var user: iPlatUser;
    var setting: iSetting;
    var plat: iPlat;
    var native: iNative;
    var define: iDefine;
    var share:iShare;

    //=================RESP======================
    /** 平台登录接口返回 **/
    interface iPlatLoginResp {
        user?: mgsdk.iPlatUser,
    }

    /**获取平台接口返回 */
    interface iPlatInfoResp {
        cli_config?: any
    }


    interface BaseThirdUserIdResp {
        /**
         * 可能的错误信息
         */
        errMsg?: string;
        /**
         * 第三方登录接口返回的数据
         */
        data?: any;
        /**
         * 可能的堆栈信息
         */
        stack?: string;
    }

    /**
 * 分享接口的内容
 */
    // interface IShareContext {
    //     /**
    //      * 分享的标题 
    //      */
    //     title?: string;
    //     /**
    //      * 分享的文本显示
    //      */
    //     text?: string;
    //     /**
    //      * 有效平台:facebook 
    //      * facebook平台: 图片base64编码
    //      * 玩一玩平台:url 地址
    //      */
    //     image?: string;
    //     /**
    //      * 有效平台:facebook,sina
    //      * 表示共享的目标
    //      * Indicates the intent of the share.
    //      * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
    //      * 邀请，请求，挑战，分享
    //      */
    //     ShareType?: string;
    //     /**
    //      * 有效平台:facebook,玩一玩
    //      * 分享启动的附加数据，facebook 比如跳转游戏时启动的数据
    //      */
    //     data?: any;
    //     /**
    //      * 有效平台:sina
    //      * 邀请识别码,这里要将ShareType设置为INVITE
    //      */
    //     cpext?: string;
    //     /**用于统计分享的点击的key */
    //     shareId?: string;
    //     /**使用平台配置分享时需要传入的参数 */
    //     kId?: string;
    //     /**视频的路径 */
    //     videoPath?: string;
    //     fbChooseData?: any;

    // }

}

type DataResponseCallback = (res: iRespBase) => void;
type ResponseCallback = (res: any) => void;

interface iRespBase {
    success: boolean,
    data: any;
    code?: number;
    msg?: string;
    note?: string;
}

interface IRequestOptions {
    /** 开发者服务器接口地址 */
    url: string;
    /** 请求的参数 */
    data?: string | any;
    /** 设置请求的 header , header 中不能设置 Referer */
    header?: string[];
    /** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
    method?: string;
    /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
    success?: DataResponseCallback;
    /** 接口调用失败的回调函数 */
    fail?: ResponseCallback;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ResponseCallback;
}

interface iLoginResponseOpts {
    success?: Function,
    fail?: Function,
    arg?: Array<any> | any,
    getUser?: boolean,                    //获取用户名和头像授权
    /**登录按钮，不传的话就用默认的。。。。。目前是微信小游戏需要 */
    btnStyle?: { skin?: string, x?: number, y?: number, width?: number, height?: number },
}
