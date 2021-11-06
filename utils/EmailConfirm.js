class EmailConfirm {

    constructor(listenerName, listenerEmail, bellringerName, bellringerEmail, time) {
        this.listenerName = listenerName;
        this.listenerEmail = listenerEmail;
        this.bellringerName = bellringerName;
        this.bellringerEmail = bellringerEmail;
        this.time = time;
    }

    bellringerHTML = () => {
        const { listenerName, listenerEmail, bellringerName, bellringerEmail, time } = this;
        return (
            `<p><span style="font-weight: 400;"> 亲爱的 ${bellringerName}，你好 </span></p>
            <p><span style="font-weight: 400;"> 我们已成功为您匹配到倾听者 ${listenerName}。 </span></p>
            <p> </p>
            <p><strong> 您的解聆时间为：${time} </strong></p>
            <p> </p>
            <p><span style="color: #800000;"> <strong> 距离您解聆时间开始前10分钟， 倾听者${listenerName}会通过邮箱 ${listenerEmail} </strong> 向您发送微信群聊二维码。（请务必在摇铃开始前检查您的邮箱！） </strong> </span></p>
            <p> </p>
            <p><span style="text-decoration: underline;"> <span style="font-weight: 400;"> 若需要取消解聆，请务必第一时间通过邮箱联系倾听者，谢谢。 </span> </span></p>
            <p><span style="text-decoration: underline;"> <span style="font-weight: 400;"> 若摇铃时间开始后25分钟您仍未登陆群聊，此次线上解聆将被取消。 </span> </span></p>
            <p> </p>
            <p><span style="font-weight: 400;"> 倾听者们皆为无偿倾听，他们志愿付出自己的时间和一份努力为同龄人提供一个开放，包容的倾诉/倾听空间。相互尊重是良好志愿解聆关系的基础，请谨遵摇铃守则并保证准时。 </span></p>
            <p><span style="font-weight: 400;"> 若摇铃人出现三次超时登陆或于约定解聆时间无法与其取得联系的情况，将被加入摇铃黑名单，谢谢理解。 </span></p>
            <p> </p>
            <p><strong> 以下是解聆服务须知，请您仔细阅读，谢谢： </strong></p>
            <ol>
            <li> <em><em><span>摇铃人需尊重倾听者个人隐私，不得在解聆结束后向任何第三方转述、透露、或公开发布倾听者在解聆过程中提及的个人信息、隐私、及亲身经历。</span></em></em></li>
            <li><em><span style="font-weight: 400;">请摇铃人在解聆过程中请文明用语，尊重倾听者。若两次警告未果，倾听者有权利及时结束解聆。</span> </em></li>
            <li><em><span style="font-weight: 400;">平台不对倾听者的行为、言论、及解聆过程中的任何相关延伸领域承担责任。 </span> </em></li>
            <li><em> <span style="font-weight: 400;"> 解聆结束后，摇铃人与倾听者间解聆关系解除，平台不对倾听者和摇铃人私人间或单方面的协议承担任何形式的责任或义务。</span></em></li>
            </ol>
            <p> </p>
            <p> </p>
            <p><span style="font-weight: 400;"> 祝您度过美好的一天！ </span></p>
            <p><span style="font-weight: 400;"> 解聆人公益 </span></p>`
        );
    }

    listenerHTML = () => {
        const { listenerName, listenerEmail, bellringerName, bellringerEmail, time } = this;
        return (
            `<p><span style="font-weight: 400;">亲爱的 ${listenerName}， 我们已成功为您匹配到摇铃人 ${bellringerName}</span></p>
            <p> </p>
            <p><strong>您的解聆时间为：${time}</strong></p>
            <p><span style="color: #800000;"><strong>请您在摇铃时间开始前10分钟向摇铃人通过邮箱发送您的群聊二维码，谢谢</strong></span></p>
            <p> </p>
            <p><span style="font-weight: 400;">若有意外情况发生需要取消摇铃，请自行联系替补倾听者，并向小助手汇报，谢谢。</span></p>
            <p><span style="font-weight: 400;">若摇铃时间开始后25分钟您的摇铃人仍未登陆群聊，此次线上解聆将被取消。若有此情况发生，请将摇铃人的信息发送给小助手，谢谢。</span></p>
            <p> </p>
            <p><strong>以下为摇铃人${bellringerName}的基本信息：</strong></p>
            <p> </p>
            <ul>
            <li><strong><strong>姓名: ${bellringerName}</strong></strong></li>
            </ul>
            <ul>
            <li><strong>邮箱: ${bellringerEmail}</strong></li>
            </ul>
            <ul>
            <li><strong>解聆话题: @X</strong></li>
            </ul>
            <ul>
            <li><strong>解聆需求: @X</strong></li>
            </ul>
            <ul>
            <li><strong>精神状态: @X</strong></li>
            </ul>
            <ul>
            <li><strong>其他信息: @X</strong></li>
            </ul>
            <p> </p>
            <p><br /><br /></p>
            <p><span style="font-weight: 400;">祝您度过美好的一天！</span></p>
            <p><span style="font-weight: 400;">解聆人公益</span></p>`
        );
    }
}

module.exports = EmailConfirm;
