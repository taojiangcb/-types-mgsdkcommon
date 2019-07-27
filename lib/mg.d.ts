

declare namespace mgsdk {

    /** 初始化 sdk 的配置 */
    type PlatInitOps = {
        platId:number,                              //平台id
        gameId:number,                              //平台游戏id
        success:(res?:any)=>void,                   //平台 登录成功之后回调
        fail:(msg?:string)=>void                    //平台 登录失败时候回调

        libUrl?:string,                             //第三方sdk 如果有先要加载  第三方h5 有用
        outLog?:boolean,                            //是否调试 log 的日志显示
        mode?:0|1|2,                                //0开发模式,1测试服务，2线上服务
        sdk_server_deg:string,                      //开发服务的地址
    }

    /**生命周期配置 */
    type PlatLifeOpts = {
        onLaunch:((res?:any)=>void);                //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        onShow:((res?:any)=>void);                  //应用到前台时处理
        onHide:((res?:any)=>void);                  //应用到后台时处理
        onError:((error?:any)=>void);               //平台捕获到异常时处理
        onExit:(()=>void);                          //退出时处理
    }

    interface PlatLoginParams {
        user:iPlatUser,                             //登录的用户
        platId:number,                              
        gameId:number,
    }

    interface iSetting {
        canPay:boolean;                     //有充值？
        canViedo:boolean;                   //有视频广告?
        canBanner:boolean;                  //有banner广告？
        canShare:boolean;                   //可以分享?
    }
    
    interface iPlatUser {
        id?:string;                         //平台id
        naickName?:string;                  //昵称
        avatar?:string;                     //头像
        openId?:string;                     //平台的 openId
        skey?:string;                       //
        loginToken?:string;                 //平台登录的 tokeng 发放钻石用的
        code?:number;
    }

    interface iDefine {
        platId:number;
        gameId:number;
        setting:iSetting;
        user:iPlatUser;
        sdk_server_local:string;               //本地平台服务地址
        mode:0 | 1 | 2;                        //sdk 运行的模式 0本地开发，1线上测试，2线上正式
        sdk_server_url:string;                 //平台服务的地址
    }

    interface iPlat{
        login(opts:iLoginResponse);            //登录平台
        cliConfig?:any                         //从服务端获取到的 配置信息 
    }
    
    interface iNative{
        /** 加载第三方h5 lib 库 */
        requireLib(url:string,success?:()=>void,fail?:()=>void);
        /**网络请求 */
        httpRequst(any: IRequestOptions);
        /**倒计时 */
        timeOnce(delay: number, caller: any, method: Function, ...args);
        clearTimeOnce(timer: any);  
        /** 本地数据处理 */
        setItem(key:string,value:any):void;
        getItem(key:string):any;

    }

    /**
     * sdk 初始化
     * @param opts 
     * @param lifeOpts 
     * @param platSetting 
     */
    function init(opts:PlatInitOps,lifeOpts?:PlatLifeOpts,platSetting?:iSetting);

    var lifeOpts:PlatLifeOpts;
    var initOpts:PlatInitOps;
    var user:iPlatUser;
    var setting:iSetting;
    var plat:iPlat;
    var native:iNative;
    var define:iDefine
}

type DataResponseCallback = (res: RespBase) => void;
type ResponseCallback = (res: any) => void;

interface RespBase {
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

interface iLoginResponse {
    success?: Function,
    fail?: Function,
    arg?: Array<any> | any,
    getUser?: boolean,                    //获取用户名和头像授权
    /**登录按钮，不传的话就用默认的。。。。。目前是微信小游戏需要 */
    btnStyle?: { skin?: string, x?: number, y?: number, width?: number, height?: number },
}
