// Type definitions for weapp
// Project: https://mp.weixin.qq.com/debug/wxadoc/dev/index.html
// Definitions by: vargeek <https://github.com/vargeek>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace tt {
    type NoneParamCallback = () => void;
    type OneParamCallback = (data: any) => void;
    type ResponseCallback = (res: any) => void;
    type ShareCallback = (res: ShareRespose) => void;
    type DataResponseCallback = (res: DataResponse) => void;
    type TempFileResponseCallback = (res: TempFileResponse) => void;
    type ErrorCallback = (error: any) => void;
    type EventCallback = (event: any) => void;
    type OnShowCallBack = (res: { scene: string, query: any, shareTicket: string }) => void;

    interface DataResponse {
        /** 回调函数返回的内容 */
        data: any;
    }
    interface TempFileResponse {
        /** 文件的临时路径 */
        tempFilePath: string;
    }

    interface ShareRespose {
        shareTickets: Array<string>;                    //每一项是一个 string 类型的 ShareTicket ，对应每个群。如果此次转发是带 shareTicket 的转发则会有回调此参数。可作为 wx.getShareInfo() 的参数来获取群 id。
        groupMsgInfos: Array<Array<any>>;               //群消息票据信息列表，长度与 res.shareTickets 相等
    }

    interface PageOptions {
        /** 页面的初始数据 */
        data?: any;
        /** 生命周期函数--监听页面加载 */
        onLoad?: (options: any) => void;
        /** 生命周期函数--监听页面渲染完成 */
        onReady?: NoneParamCallback;
        /** 生命周期函数--监听页面显示 */
        onShow?: NoneParamCallback;
        /** 生命周期函数--监听页面隐藏 */
        onHide?: NoneParamCallback;
        /** 生命周期函数--监听页面卸载 */
        onUnload?: NoneParamCallback;
        [key: string]: any;
    }

    interface AppOptions {
        /**
         * 生命周期函数--监听小程序初始化
         * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
         */
        onLaunch?: NoneParamCallback;
        /**
         * 生命周期函数--监听小程序显示
         * 当小程序启动，或从后台进入前台显示，会触发 onShow
         */
        onShow?: NoneParamCallback;
        /**
         * 生命周期函数--监听小程序隐藏
         * 当小程序从前台进入后台，会触发 onHide
         */
        onHide?: NoneParamCallback;
        [key: string]: any
    }

    interface RequestHeader {
        [key: string]: string;
    }
    interface RequestOptions {
        /** 开发者服务器接口地址 */
        url: string;
        /** 请求的参数 */
        data?: string | any;
        /** 设置请求的 header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
        method?: string;
        /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
        success?: DataResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
     */
    function request(options: RequestOptions): void;


    interface UploadFileOptions {
        /** 开发者服务器 url */
        url: string;
        /** 要上传文件资源的路径 */
        filePath: string;
        /** 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
        name: string;
        /** HTTP 请求 Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** HTTP 请求中其他额外的 form data */
        formData?: any;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 将本地资源上传到开发者服务器。
     * 如页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，
     * 可通过此接口将本地资源上传到指定服务器。
     * 客户端发起一个 HTTPS POST 请求，
     * 其中 Content-Type 为 multipart/form-data 。
     */
    function uploadFile(options: UploadFileOptions): void;


    interface RecorderManager {
        start(d:{duration:number}):void;
        pause():void;
        recordClip():void;
        clipVideo():void;
        resume():void;
        stop():void;
        onStart(callBack:(res)=>void):void;
        onResume(callBack:()=>void):void;
        onPause(callBack:()=>void):void;
        onStop(callBack:(res:{videoPath:string})=>void);
        onError(callBack:(errMsg)=>void);
    }

    //录像
    function getGameRecorderManager():RecorderManager;


    interface DownloadFileOptions {
        /** 下载资源的 url */
        url: string;
        /** 下载资源的类型，用于客户端识别处理，有效值：image/audio/video */
        type?: string;
        filePath?: string;
        /** HTTP 请求 Header */
        header?: RequestHeader;
        /** 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} */
        success?: TempFileResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，
     * 把下载到的资源根据 type 进行处理，并返回文件的本地临时路径。
     */
    function downloadFile(options: DownloadFileOptions): void;


    interface ConnectSocketOptions {
        /** 开发者服务器接口地址，必须是 HTTPS 协议，且域名必须是后台配置的合法域名 */
        url: string;
        /** 请求的数据 */
        data?: any;
        /** HTTP Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
        method?: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 创建一个 WebSocket 连接；
     * 一个微信小程序同时只能有一个 WebSocket 连接，
     * 如果当前已存在一个 WebSocket 连接，
     * 会自动关闭该连接，并重新创建一个 WebSocket 连接。
     */
    function connectSocket(options: ConnectSocketOptions): void;


    /** 监听WebSocket连接打开事件。 */
    function onSocketOpen(callback: OneParamCallback): void;

    /** 监听WebSocket错误。 */
    function onSocketError(callback: ErrorCallback): void;

    interface SendSocketMessageOptions {
        /**	需要发送的内容 */
        data: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，
     * 并在 wx.onSocketOpen 回调之后才能发送。
     */
    function sendSocketMessage(options: SendSocketMessageOptions): void;


    /**
     * 监听WebSocket接受到服务器的消息事件。
     */
    function onSocketMessage(callback: DataResponseCallback): void;

    /**
     * 关闭WebSocket连接。
     */
    function closeSocket(): void;

    /** 监听WebSocket关闭。 */
    function onSocketClose(callback: ResponseCallback): void;

    type ImageSizeType = 'original' | 'compressed';
    type ImageSourceType = 'album' | 'camera';
    type VideoSourceType = 'album' | 'camera';
    type CameraDevice = 'front' | 'back';

    interface TempFilesData {
        /** 文件的临时路径 */
        tempFilePaths: string;
    }
    interface ChooseImageOptions {
        /** 最多可以选择的图片张数，默认9 */
        count?: number;
        /** original 原图，compressed 压缩图，默认二者都有 */
        sizeType?: Array<ImageSizeType>;
        /** album 从相册选图，camera 使用相机，默认二者都有 */
        sourceType?: Array<ImageSourceType>;
        /** 成功则返回图片的本地文件路径列表 tempFilePaths */
        success: (res: TempFilesData) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 从本地相册选择图片或使用相机拍照。
     */
    function chooseImage(options: ChooseImageOptions): void;

    interface PreviewImageOptions {
        /** 当前显示图片的链接，不填则默认为 urls 的第一张 */
        current?: string;
        /** 需要预览的图片链接列表 */
        urls: Array<string>;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 预览图片。
     */
    function previewImage(options: PreviewImageOptions): void;

    interface StartRecordOptions {
        /** 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'} */
        success?: TempFileResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 开始录音。当主动调用wx.stopRecord，
     * 或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。
     * 注：文件的临时路径，在小程序本次启动期间可以正常使用，
     * 如需持久保存，需在主动调用wx.saveFile，在小程序下次启动时才能访问得到。
     */
    function startRecord(options: StartRecordOptions): void;

    /**
     * ​ 主动调用停止录音。
     */
    function stopRecord(): void;

    interface PlayVoiceOptions {
        /** 需要播放的语音文件的文件路径 */
        filePath: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 开始播放语音，同时只允许一个语音文件正在播放，
     * 如果前一个语音文件还没播放完，将中断前一个语音播放。
     */
    function playVoice(options: PlayVoiceOptions): void;

    /**
     * 暂停正在播放的语音。
     * 再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。
     * 如果想从头开始播放，需要先调用 wx.stopVoice。
     */
    function pauseVoice(): void;

    /**
     * 结束播放语音。
     */
    function stopVoice(): void;

    interface BackgroundAudioPlayerState {
        /** 选定音频的长度（单位：s），只有在当前有音乐播放时返回 */
        duration?: number;
        /** 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回 */
        currentPosition?: number;
        /** 播放状态（2：没有音乐在播放，1：播放中，0：暂停中） */
        status: number;
        /** 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回 */
        downloadPercent?: number;
        /** 歌曲数据链接，只有在当前有音乐播放时返回 */
        dataUrl?: string;
    }
    type GetBackgroundAudioPlayerStateSuccessCallback = (state: BackgroundAudioPlayerState) => void;
    interface GetBackgroundAudioPlayerStateOptions {
        /** 接口调用成功的回调函数 */
        success?: GetBackgroundAudioPlayerStateSuccessCallback;
        /** 接口调用失败的回调函数 */
        fail?: NoneParamCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: NoneParamCallback;
    }
    /** 获取音乐播放状态。 */
    function getBackgroundAudioPlayerState(options: GetBackgroundAudioPlayerStateOptions): void;

    interface PlayBackgroundAudioOptions {
        /** 音乐链接 */
        dataUrl: string;
        /** 音乐标题 */
        title?: string;
        /** 封面URL */
        coverImgUrl?: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;

    }
    /** 播放音乐，同时只能有一首音乐正在播放。 */
    function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;

    /** 暂停播放音乐。 */
    function pauseBackgroundAudio(): void;

    interface SeekBackgroundAudioOptions {
        /** 音乐位置，单位：秒 */
        position: number;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 控制音乐播放进度。
     */
    function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;

    /**
     * 停止播放音乐。
     */
    function stopBackgroundAudio(): void;

    /** 监听音乐播放。 */
    function onBackgroundAudioPlay(callback: NoneParamCallback): void;

    /** 监听音乐暂停。 */
    function onBackgroundAudioPause(callback: NoneParamCallback): void;

    /** 监听音乐停止。 */
    function onBackgroundAudioStop(callback: NoneParamCallback): void;

    interface SavedFileData {
        /** 文件的保存路径 */
        savedFilePath: string;
    }
    interface SaveFileOptions {
        /** 需要保存的文件的临时路径 */
        tempFilePath: string;
        /** 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'} */
        success?: (res: SavedFileData) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 保存文件到本地。
     */
    function saveFile(options: SaveFileOptions): void;

    interface VideoData {
        /** 选定视频的临时文件路径 */
        tempFilePath: string;
        /** 选定视频的时间长度 */
        duration: number;
        /** 选定视频的数据量大小 */
        size: number;
        /** 返回选定视频的长 */
        height: number;
        /** 返回选定视频的宽 */
        width: number;
    }
    interface ChooseVideoOptions {
        /** album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera'] */
        sourceType?: Array<VideoSourceType>;
        /** 拍摄视频最长拍摄时间，单位秒。最长支持60秒 */
        maxDuration?: number;
        /** 前置或者后置摄像头，默认为前后都有，即：['front', 'back'] */
        camera?: Array<CameraDevice>;
        /** 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 */
        success?: (res: VideoData) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
     */
    function chooseVideo(options: ChooseVideoOptions): void;

    interface SetStorageOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 需要存储的内容 */
        data: any | string;
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
     * 将 data 存储在本地缓存中指定的 key 中，
     * 会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     *
     * @param {string} key 本地缓存中的指定的 key
     * @param {(Object | string)} data 需要存储的内容
     */
    function setStorageSync(key: string, data: any | string): void;

    interface GetStorageOptions {
        /** 本地缓存中的指定的 key */
        key: string;
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

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     *
     * @param {string} key
     * @returns {(Object | string)}
     */
    function getStorageSync(key: string): any | string;


    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     *
     * @param {(Object)} key
     */
    function getStorageInfo(options: { success?: Function, fail?: Function, complete?: Function }): void;


    /**
     * 清理本地数据缓存。
     */
    function clearStorage(): void;
    /**
     * 同步清理本地数据缓存
     */
    function clearStorageSync(): void;

    interface LocationData {
        /** 纬度，浮点数，范围为-90~90，负数表示南纬 */
        latitude: number;
        /** 经度，浮点数，范围为-180~180，负数表示西经 */
        longitude: number;
        /** 速度，浮点数，单位m/s */
        speed: number;
        /** 位置的精确度 */
        accuracy: number;
    }

    interface GetLocationOptions {
        /** 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标 */
        type?: 'wgs84' | 'gcj02';
        /** 接口调用成功的回调函数，返回内容详见返回参数说明。 */
        success: (res: LocationData) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 获取当前的地理位置、速度。
     */
    function getLocation(options: GetLocationOptions): void;

    interface OpenLocationOptions {
        /** 纬度，范围为-90~90，负数表示南纬 */
        latitude: number;
        /** 经度，范围为-180~180，负数表示西经 */
        longitude: number;
        /** 缩放比例，范围1~28，默认为28 */
        scale?: number;
        /** 位置名 */
        name?: string;
        /** 地址的详细说明 */
        address?: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 使用微信内置地图查看位置
     */
    function openLocation(options: OpenLocationOptions): void;

    interface NetworkTypeData {
        /** 返回网络类型2g，3g，4g，wifi */
        networkType: '2g' | '3g' | '4g' | 'wifi';
    }
    interface GetNetworkTypeOptions {
        /** 接口调用成功，返回网络类型 networkType */
        success: (res: NetworkTypeData) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 获取网络类型。
     */
    function getNetworkType(options: GetNetworkTypeOptions): void;


    interface SystemInfo {
        /** 手机型号 */
        model: string;
        /** 设备像素比 */
        pixelRatio: number;
        /** 窗口宽度 */
        windowWidth: number;
        /** 窗口高度 */
        windowHeight: number;
        /** 微信设置的语言 */
        language: string;
        /** 微信版本号 */
        version: string;
        /**客户端基础库版本号 */
        SDKVersion: string;
        /**系统 */
        system: string;
    }
    interface GetSystemInfoOptions {
        /** 成功获取系统信息的回调 */
        success: (res: SystemInfo) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 获取系统信息。
     */
    function getSystemInfo(options: GetSystemInfoOptions): void;
    function getSystemInfoSync(): SystemInfo;

    interface AccelerometerData {
        /** X 轴 */
        x: number;
        /** Y 轴 */
        y: number;
        /** Z 轴 */
        z: number;
    }
    type AccelerometerChangeCallback = (res: AccelerometerData) => void;
    /**
     * 监听重力感应数据，频率：5次/秒
     */
    function onAccelerometerChange(callback: AccelerometerChangeCallback): void;

    interface CompassData {
        /** 面对的方向度数 */
        direction: number;
    }
    type CompassChangeCallback = (res: CompassData) => void;
    function onCompassChange(callback: CompassChangeCallback): void;

    interface SetNavigationBarTitleOptions {
        /** 页面标题 */
        title?: string;
        /** 成功获取系统信息的回调 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 动态设置当前页面的标题。
     */
    function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

    /**
     * 在当前页面显示导航条加载动画。
     */
    function showNavigationBarLoading(): void;
    /**
     * 隐藏导航条加载动画。
     */
    function hideNavigationBarLoading(): void;

    interface NavigateToOptions {
        /** 需要跳转的应用内页面的路径 */
        url: string;
        /** 成功获取系统信息的回调 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
     *
     * 注意：为了不让用户在使用小程序时造成困扰，
     * 我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
     */
    function navigateTo(options: NavigateToOptions): void;

    interface RedirectToOptions {
        /** 需要跳转的应用内页面的路径 */
        url: string;
        /** 成功获取系统信息的回调 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 关闭当前页面，跳转到应用内的某个页面。
     */
    function redirectTo(options: RedirectToOptions): void;

    /**
     * 关闭当前页面，回退前一页面。
     */
    function navigateBack(): void;

    type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

    interface CreateAnimationOptions {
        /** 动画持续时间，单位ms，默认值 400 */
        duration?: number;
        /** 定义动画的效果，默认值"linear"，有效值："linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end" */
        timingFunction?: TimingFunction;
        /** 动画持续时间，单位 ms，默认值 0 */
        delay?: number;
        /** 设置transform-origin，默认为"50% 50% 0" */
        transformOrigin?: string;
    }

    interface Animator {
        actions: Array<AnimationAction>;
    }
    interface AnimationAction {
        animates: Array<Animate>;
        option: AnimationActionOption;
    }
    interface AnimationActionOption {
        transformOrigin: string;
        transition: AnimationTransition;
    }
    interface AnimationTransition {
        delay: number;
        duration: number;
        timingFunction: TimingFunction;
    }
    interface Animate {
        type: string;
        args: Array<any>;
    }

    /**
     * 创建一个动画实例animation。调用实例的方法来描述动画。
     * 最后通过动画实例的export方法导出动画数据传递给组件的animation属性。
     *
     * 注意: export 方法每次调用后会清掉之前的动画操作
     */
    function createAnimation(options?: CreateAnimationOptions): Animation;
    /** 动画实例可以调用以下方法来描述动画，调用结束后会返回自身，支持链式调用的写法。 */
    interface Animation {
        /**
         * 调用动画操作方法后要调用 step() 来表示一组动画完成，
         * 可以在一组动画中调用任意多个动画方法，
         * 一组动画中的所有动画会同时开始，
         * 一组动画完成后才会进行下一组动画。
         * @param {CreateAnimationOptions} options 指定当前组动画的配置
         */
        step(options?: CreateAnimationOptions): void;
        /**
         * 导出动画操作
         *
         * 注意: export 方法每次调用后会清掉之前的动画操作
         */
        export(): Animator;

        /** 透明度，参数范围 0~1 */
        opacity(value: number): Animation;
        /** 颜色值 */
        backgroundColor(color: string): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        width(length: number): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        height(length: number): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        top(length: number): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        left(length: number): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        bottom(length: number): Animation;
        /** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
        right(length: number): Animation;

        /** deg的范围-180~180，从原点顺时针旋转一个deg角度 */
        rotate(deg: number): Animation;
        /** deg的范围-180~180，在X轴旋转一个deg角度 */
        rotateX(deg: number): Animation;
        /** deg的范围-180~180，在Y轴旋转一个deg角度 */
        rotateY(deg: number): Animation;
        /** deg的范围-180~180，在Z轴旋转一个deg角度 */
        rotateZ(deg: number): Animation;
        /** 同transform-function rotate3d */
        rotate3d(x: number, y: number, z: number, deg: number): Animation;

        /**
         * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；
         * 两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
         */
        scale(sx: number, sy?: number): Animation;
        /** 在X轴缩放sx倍数 */
        scaleX(sx: number): Animation;
        /** 在Y轴缩放sy倍数 */
        scaleY(sy: number): Animation;
        /** 在Z轴缩放sy倍数 */
        scaleZ(sz: number): Animation;
        /** 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数 */
        scale3d(sx: number, sy: number, sz: number): Animation;

        /**
         * 一个参数时，表示在X轴偏移tx，单位px；
         * 两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
         */
        translate(tx: number, ty?: number): Animation;
        /**
         * 在X轴偏移tx，单位px
         */
        translateX(tx: number): Animation;
        /**
         * 在Y轴偏移tx，单位px
         */
        translateY(ty: number): Animation;
        /**
         * 在Z轴偏移tx，单位px
         */
        translateZ(tz: number): Animation;
        /**
         * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
         */
        translate3d(tx: number, ty: number, tz: number): Animation;

        /**
         * 参数范围-180~180；
         * 一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；
         * 两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
         */
        skew(ax: number, ay?: number): Animation;
        /** 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度 */
        skewX(ax: number): Animation;
        /** 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度 */
        skewY(ay: number): Animation;

        /**
         * 同transform-function matrix
         */
        matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
        /** 同transform-function matrix3d */
        matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): Animation;
    }

    interface CanvasAction {
        method: string;
        data: Array<CanvasAction> | Array<number | string>
    }
    type LineCapType = 'butt' | 'round' | 'square';
    type LineJoinType = 'bevel' | 'round' | 'miter';
    /**
     * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
     */
    interface CanvasContext {
        /** 获取当前context上存储的绘图动作 */
        getActions(): Array<CanvasAction>
        /** 清空当前的存储绘图动作 */
        clearActions(): void;
        /**
         * 对横纵坐标进行缩放
         * 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。
         * 多次调用scale，倍数会相乘。
         *
         * @param {number} scaleWidth 横坐标缩放的倍数
         * @param {number} scaleHeight 纵坐标轴缩放的倍数
         */
        scale(scaleWidth: number, scaleHeight?: number): void;
        /**
         * 对坐标轴进行顺时针旋转
         * 以原点为中心，原点可以用 translate方法修改。
         * 顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
         *
         * @param {number} rotate 旋转角度，以弧度计。
         */
        rotate(rotate: number): void;
        /**
         * 对坐标原点进行缩放
         * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
         *
         * @param {number} x 水平坐标平移量
         * @param {number} y 竖直坐标平移量
         */
        translate(x: number, y: number): void;
        /**
         * 保存当前坐标轴的缩放、旋转、平移信息
         */
        save(): void;
        /**
         * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
         */
        restore(): void;
        /**
         * 在给定的矩形区域内，清除画布上的像素
         * 清除画布上在该矩形区域内的内容。
         *
         * @param {number} x 矩形区域左上角的x坐标
         * @param {number} y 矩形区域左上角的y坐标
         * @param {number} width 矩形区域的宽度
         * @param {number} height 矩形区域的高度
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * 在画布上绘制被填充的文本
         *
         * @param {string} text 在画布上输出的文本
         * @param {number} x 绘制文本的左上角x坐标位置
         * @param {number} y 绘制文本的左上角y坐标位置
         */
        fillText(text: string, x: number, y: number): void;
        /**
         * 在画布上绘制图像
         * 绘制图像，图像保持原始尺寸。
         *
         * @param {string} imageResource 所要绘制的图片资源。 通过chooseImage得到一个文件路径或者一个项目目录内的图片
         * @param {number} x 图像左上角的x坐标
         * @param {number} y 图像左上角的y坐标
         */
        drawImage(imageResource: string | Image, x: number, y: number, width?: number, heigt?: number): void;
        /**
         * 对当前路径进行填充
         */
        fill(): void;
        /**
         * 对当前路径进行描边
         */
        stroke(): void;
        /**
         * 开始一个路径
         * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
         * 同一个路径内的多次setFillStyle、setStrokeStyle、setLineWidth等设置，
         * 以最后一次设置为准。
         */
        beginPath(): void;
        /**
         * 关闭一个路径
         */
        closePath(): void;
        /**
         * 把路径移动到画布中的指定点，但不创建线条。
         *
         * @param {number} x 目标位置的x坐标
         * @param {number} y 目标位置的y坐标
         */
        moveTo(x: number, y: number): void;
        /**
         * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
         *
         * @param {number} x 目标位置的x坐标
         * @param {number} y 目标位置的y坐标
         */
        lineTo(x: number, y: number): void;
        /**
         * 添加一个矩形路径到当前路径。
         *
         * @param {number} x 矩形路径左上角的x坐标
         * @param {number} y 矩形路径左上角的y坐标
         * @param {number} width 矩形路径的宽度
         * @param {number} height 矩形路径的高度
         */
        rect(x: number, y: number, width: number, height: number): void;
        /**
         * 添加一个弧形路径到当前路径，顺时针绘制。
         *
         * @param {number} x 矩形路径左上角的x坐标
         * @param {number} y 矩形路径左上角的y坐标
         * @param {number} radius 矩形路径左上角的y坐标
         * @param {number} startAngle 起始弧度
         * @param {number} endAngle 结束弧度
         * @param {boolean} sweepAngle 从起始弧度开始，扫过的弧度
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, sweepAngle: boolean): void;
        /**
         * 创建二次方贝塞尔曲线
         *
         * @param {number} cpx 贝塞尔控制点的x坐标
         * @param {number} cpy 贝塞尔控制点的y坐标
         * @param {number} x 结束点的x坐标
         * @param {number} y 结束点的y坐标
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * 创建三次方贝塞尔曲线
         *
         * @param {number} cp1x 第一个贝塞尔控制点的 x 坐标
         * @param {number} cp1y 第一个贝塞尔控制点的 y 坐标
         * @param {number} cp2x 第二个贝塞尔控制点的 x 坐标
         * @param {number} cp2y 第二个贝塞尔控制点的 y 坐标
         * @param {number} x 结束点的x坐标
         * @param {number} y 结束点的y坐标
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * 设置填充样式
         *
         * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setFillStyle(color: string): void;
        /**
         * 设置线条样式
         *
         * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setStrokeStyle(color: string): void;
        /**
         * 设置阴影
         *
         * @param {number} offsetX 阴影相对于形状在水平方向的偏移
         * @param {number} offsetY 阴影相对于形状在竖直方向的偏移
         * @param {number} blur 阴影的模糊级别，数值越大越模糊 0~100
         * @param {string} color 阴影的颜色。 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;
        /**
         * 设置字体大小
         *
         * @param {number} fontSize 字体的字号
         */
        setFontSize(fontSize: number): void;
        /**
         * 设置线条端点的样式
         *
         * @param {LineCapType} lineCap 线条的结束端点样式。 'butt'、'round'、'square'
         */
        setLineCap(lineCap: LineCapType): void;
        /**
         * 设置两线相交处的样式
         *  @param {LineJoinType} lineJoin 两条线相交时，所创建的拐角类型
         */
        setLineJoin(lineJoin: LineJoinType): void;
        /**
         * 设置线条宽度
         *
         * @param {number} lineWidth 线条的宽度
         */
        setLineWidth(lineWidth: number): void;
        /** 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。
         * 当 setLineJoin为 miter 时才有效。
         * 超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
         *
         * @param {number} miterLimit 最大斜接长度
         */
        setMiterLimit(miterLimit: number): void;
    }
    /**
     * 创建并返回绘图上下文context对象。
     * context只是一个记录方法调用的容器，
     * 用于生成记录绘制行为的actions数组。c
     * ontext跟<canvas/>不存在对应关系，
     * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
     */
    function createContext(): CanvasContext;

    interface DrawCanvasOptions {
        /** 画布标识，传入 <canvas/> 的 cavas-id */
        canvasId: number | string;
        /**
         * 绘图动作数组，由 wx.createContext 创建的 context，
         * 调用 getActions 方法导出绘图动作数组。
         */
        actions: Array<CanvasAction>;
    }
    /**
     * 绘制画布
     */
    function drawCanvas(options: DrawCanvasOptions): void;

    /**
     * 收起键盘。
     */
    function hideKeyboard(): void;

    interface LoginResponse {
        code?: string;               //临时登录凭证，有效期 3 分钟
        anonymousCode?:string;       //用于标识当前设备，无论登录与否都会返回，有效期 3 分钟
    }
    interface LoginOptions {
        /** 接口调用成功的回调函数 */
        success?: (res: LoginResponse) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        force?:boolean;
    }

    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，
     * 包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）。
     * 用户数据的加解密通讯需要依赖会话密钥完成。
     */
    function login(option: LoginOptions): void;

    interface UserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
    }
    interface UserInfoResponse {
        /** 用户信息对象，不包含 openid 等敏感信息 */
        userInfo: UserInfo;
        /** 不包括敏感信息的原始数据字符串，用于计算签名。 */
        rawData: string;
        /** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。 */
        signature: string;
        /** 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法 */
        encryptedData: string;
        iv: string,
        errMsg?: string,
    }
    interface GetUserInfoOptions {
        withCredentials?: boolean;
        lang?: string;
        /** 接口调用成功的回调函数 */
        success?: (res: UserInfoResponse) => void;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 获取用户信息，需要先调用 wx.login 接口。
     */
    function getUserInfo(options: GetUserInfoOptions): void;
    /** 创建用户信息按钮*/
    function createUserInfoButton(obj: { type: string, text?: string, image?: string, style: any }): UserButton;
    class UserButton {
        hide();
        show();
        onTap(callback: Function);
        offTap(callback: Function);
        destroy();
    }

    type PaymentSignType = 'MD5';
    interface RequestPaymentOptions {
        /** 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间 */
        timeStamp: string | number;
        /** 随机字符串，长度为32个字符以下。 */
        nonceStr: string;
        /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=* */
        package: string;
        /** 签名算法，暂支持 MD5 */
        signType: PaymentSignType;
        /** 签名,具体签名方案参见微信公众号支付帮助文档; */
        paySign: string;
        /** 接口调用成功的回调函数 */
        success?: ResponseCallback;
        /** 接口调用失败的回调函数 */
        fail?: ResponseCallback;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: ResponseCallback;
    }
    /**
     * 发起微信支付。
     */
    function requestPayment(options: RequestPaymentOptions): void;


    //--------------------以下接口只在开放域使用------------------------
    /**
     * 
     * @param callback 形参是主域发送的消息
     */
    function onMessage(callback: Function): void;
    function getSharedCanvas(): Canvas;
    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param obj 
     */
    function setUserCloudStorage(obj: { KVDataList: Array<KVData>, success?: Function, fail?: Function, complete?: Function });
    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     * @param keyList 要拉取的 key 列表
     * @param success 接口调用成功的回调函数,形参{data:Array<UserGameData>}	同玩好友的托管数据
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function getFriendCloudStorage(obj: { keyList: Array<string>, success?: Function, fail?: Function, complete?: Function }): void;
    /**
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
     * @param shareTicket 群分享对应的 shareTicket
     * @param keyList 要拉取的 key 列表
     * @param success 接口调用成功的回调函数,形参{data:Array<UserGameData>}	群同玩成员的托管数据
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function getGroupCloudStorage(obj: { shareTicket: string, keyList: Array<string>, success?: Function, fail?: Function, complete?: Function }): void;
    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     * @param keyList 要拉取的 key 列表
     * @param success 接口调用成功的回调函数,形参{data:Array<KVData>}用户托管的 KV 数据列表
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function getUserCloudStorage(obj: { keyList: Array<string>, success?: Function, fail?: Function, complete?: Function }): void;
    /**
     * 删除用户托管数据当中对应 key 的数据。
     * @param keyList 要删除掉 key 列表
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function removeUserCloudStorage(obj: { keyList: Array<string>, success?: Function, fail?: Function, complete?: Function }): void;
    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param keyList 要修改的 KV 数据列表
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function removeUserCloudStorage(obj: { KVDataList: Array<KVData>, success?: Function, fail?: Function, complete?: Function }): void;
    /**获取开放数据域 */
    function getOpenDataContext(): OpenDataContext;
    /**
     * 发起米大师支付
     * @param obj 
     */
    function requestMidasPayment(obj: { mode: string, env?: number, offerId: string, currencyType: string, platform?: string, buyQuantity?: number, zoneId?: string, success?: Function, fail?: Function, complete?: Function });
    /**
     * 
     * @param obj   //下面参数是对结构的注释
     * @param title 转发标题，不传则默认使用当前小游戏的昵称。
     * @param imageUrl 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。\
     * @param query 查询字符串，从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    function shareAppMessage(obj: { title?: string, imageUrl?: string, query?: string, channel?:string,success?: ShareCallback, fail?: Function, complete?: Function }): void;


    // videoPath	string		是	要转发的视频地址
    // query	string		否	查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 tt.getLaunchOptionSync() 或 tt.onShow() 获取启动参数中的 query。分享挑战视频时有效
    // title	string		否	要转发的视频描述，分享挑战视频时有效
    // extra	object		否	创建挑战视频(秒玩入口)时必填的配置
    // extra

    // 属性	类型	说明
    // createChallenge	boolean	为true时，指定分享的为挑战视频(带秒玩入口）


    //主动拉起发布视频界面
    function shareVideo(obj:{videoPath?:string,query?:string,title?:string,extra?:{createChallenge:boolean},success?:Function,fail?:Function})

    /**
     * 退出当前小游戏
     * @param obj 
     */
    function exitMiniProgram(obj: { success?: Function, fail?: Function, complete?: Function }): void
    /**
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     * @param callback 
     */
    function onHide(callback: Function);
    /**
     * 取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function offHide(callback: Function);
    /**
     * 监听小游戏回到前台的事件
     * @param callback 
     */
    function onShow(callback: OnShowCallBack);
    function onLaunch(callback: OnShowCallBack);
    function getLaunchOptionsSync(): any;
    /**
     * 取消监听小游戏回到前台的事件
     * @param callback 
     */
    function offShow(callback: Function);
    /**
     * 显示模态对话框
     * @param obj 
     */
    function showModal(obj: { title: string, content: string, showCancel?: boolean, cancelText?: string, cancelColor?: string, confirmText?: string, confirmColor?: string, success?: Function, fail?: Function, complete?: Function })
    /**
     * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
     * @param obj 
     */
    function showLoading(obj: { title: string, mask?: boolean, success?: Function, fail?: Function, complete?: Function });
    /**
     * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
     * @param obj 
     */
    function hideLoading(obj: { success?: Function, fail?: Function, complete?: Function });
    /**
     * 显示当前页面的转发按钮
     * @param obj 
     */
    function showShareMenu(obj: { withShareTicket: boolean, success?: Function, fail?: Function, complete?: Function })
    /**
     * 获取转发详细信息
     * @param obj 
     */
    function getShareInfo(obj: { shareTicket: string, success?: Function });
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param callback 
     */
    function onShareAppMessage(callback: Function);
    /**创建激励视频广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。 */
    function createRewardedVideoAd({ adUnitId: string }): RewardedVideoAd;
    function createBannerAd(obj: { adUnitId: string, style: any }): BannerAd;
    class BannerAd {
        style:{
            left: number;
            top: number;
            width: number;
            height: number;
            realWidth: number;
            realHeight: number;
        };
        show():Promise<any>;
        hide();
        destroy();
        onResize(callBack: Function);
        offResize(callBack: Function);
        onLoad(callBack: Function);
        offLoad(callBack: Function);
        onError(callBack: Function);
        offError(callBack: Function);
        destroy();
    }
    class RewardedVideoAd {
        /**隐藏激励视频广告 */
        load();
        /**显示激励视频广告。激励视频广告将从屏幕下方推入。 */
        show():Promise<any>;
        /**监听激励视频广告加载事件 */
        onLoad(callback: Function);
        /** 取消监听激励视频广告加载事件*/
        offLoad(callback: Function);
        /** 监听激励视频错误事件*/
        onError(callback: Function);
        /** 取消监听激励视频错误事件*/
        offError(callback: Function);
        /** 监听激励视频关闭事件*/
        onClose(callback: Function);
        /** 取消监听激励视频关闭事件*/
        offClose(callback: Function);
    }
    /**复制到剪贴板 */
    function setClipboardData(obj: { data: string, success?: Function, fail?: Function, complete?: Function });
    /**监听全局错误事件 */
    function onError(callBack: (res: { message: string, stack: string }) => void);
    function onError(callback: Function);
    /**设置是否打开调试开关，此开关对正式版也能生效 */
    function setEnableDebug(obj: { enableDebug: boolean, success?: Function, fail?: Function, complete?: Function });

    function getUpdateManager(): UpdateManager;

    class UpdateManager {
        applyUpdate();
        onCheckForUpdate(callBack: Function);
        onUpdateReady(callBack: Function);
        onUpdateFailed(callBack: Function);
    }

    function createImage(): Image;
}


interface Image {
    src: string;
    width: number;
    height: number;
    onload: Function;
}


interface Canvas {
    width: number,
    height: number,
    /**
     * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
     */
    toTempFilePath(obj): string;
    /**获取画布对象的绘图上下文 */
    getContext(contextType: string, contextAttributes: any): RenderingContext;
    /**把画布上的绘制内容以一个 data URI 的格式返回 */
    toDataURL(): string;
}

interface RenderingContext {

}

interface OpenDataContext {
    canvas: Canvas;
    /**
     * 向开放数据域发送消息 
     * @param message 要发送的消息，message 中及嵌套对象中 key 的 value 只能是 primitive value。即 number、string、boolean、null、undefined。
    */
    postMessage(message: any);
}

interface UserGameData {
    avatarUrl: string,
    nickname: string,
    openid: string,
    KVDataList: Array<KVData>,
}

interface KVData {
    key: string,
    value: string,
}

interface Page {
    /**
     * setData 函数用于将数据从逻辑层发送到视图层，
     * 同时改变对应的 this.data 的值。
     * 注意：
     *    1. 直接修改 this.data 无效，无法改变页面的状态，还会造成数据不一致。
     *    2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
     */
    setData(data: any): void;
}
interface PageConstructor {
    /**
     * Page() 函数用来注册一个页面。
     * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
     */
    (options: tt.PageOptions): void;
}
declare var Page: PageConstructor;


interface App {
    /**
     * getCurrentPage() 函数用户获取当前页面的实例。
     */
    getCurrentPage(): Page;
}
interface AppConstructor {
    /**
     * App() 函数用来注册一个小程序。
     * 接受一个 object 参数，其指定小程序的生命周期函数等。
     */
    (options: tt.AppOptions): void;
}
declare var App: AppConstructor;

/**
 * 我们提供了全局的 getApp() 函数，可以获取到小程序实例。
 */
declare function getApp(): App;
