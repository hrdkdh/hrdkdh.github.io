const makeLeftSide = (data) => {
    var html = `<ul>`;
    Object.entries(data).forEach(([key, value]) => {
        html += `<li>${key}</li>`;
        html += `<ul>`;
        Object.entries(value).forEach(([key2, value2]) => {
            html += `<li class="prompt_button" chapter="${key}">${key2}</li>`;
        });
        html += `</ul>`;
    });
    html += `</ul>`;
    html += `<div id="footer"><img src="../logo_pgu.svg"></div>`;
    $('#leftside').html(html);
}
const showRightSide = (prompt_content) => {
    $('#rightside').html(``);
    var elem_no = 0;
    prompt_content.forEach((element) => {
        if (element.복사여부 == false) {
            elem_no++;
            html_src = `
                <div class="prompt_element">
                    <div class="prompt_string">${elem_no}. <strong>${element["서비스명"]}</strong>(${element["분류"]}) <a href="${element["링크"]}" target="_blank">${element["링크"]}</a></div>
                </div>`;
        } else {
            var added = "";
            if (element.추가자료 != "") {
                added = `<div class="prompt_attached">${element.추가자료}</div>`;
            }
            html_src = `
                <div class="prompt_element">
                    <div class="prompt_element_wrapper">
                        <div class="prompt_string">${element.프롬프트.trim().nl2br()}</div>
                        ${added}
                    </div>
                    <div class="copy_icon">
                        <img src="../icon_copy.svg"><br><span>복사하기</span>
                    </div>
                </div>`;
        }
        $('#rightside').append(html_src);
    });
}
const copyToClipboard = (text) =>{
    navigator.clipboard.writeText(text).then(() => {
        // 팝업 생성
        const popup = document.createElement('div');
        popup.innerHTML = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <span style="font-size: 1.5rem;">복사됨!</span>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 24px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        `;
        document.body.appendChild(popup);

        // 애니메이션 위한 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .checkmark {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #fff;
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #7ac142;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 2;
                stroke-miterlimit: 10;
                stroke: #7ac142;
                fill: none;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #7ac142;
                }
            }
            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
        `;
        document.head.appendChild(style);

        // 2초 후 팝업 제거
        setTimeout(() => {
            document.body.removeChild(popup);
            document.head.removeChild(style);
        }, 2000);
    }).catch(err => {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다.');
    });
}
//줄바꿈 기호를 줄바꿈 태그로 변환
String.prototype.nl2br = function() {
	var ret = this.replace(/\r\n/g, "<br>")
	ret = ret.replace(/\n/g, "<br>")
	return ret;
}
String.prototype.br2nl = function() {
	var ret = this.replace(/<br>/g, "\n")
	return ret;
}

const getData = async() => {
    const response = await fetch('./data.json?date=250820');
    const data = await response.json();
    return data;
}
$(document).ready(function(){
    getData().then((res) => {
        let data = res;
        makeLeftSide(data);
        $(document).on("click", ".prompt_button", function(){
            $(".prompt_button").css({"color" : "", "background":"", "font-weight":""});
            var prompt = data[$(this).attr("chapter")][$(this).text()];
            showRightSide(prompt);
            $(this).css({"color": "white", "background": "rgb(25 183 255)", "font-weight":"bold"});
            $("html").animate({scrollTop:0}, 500);
        });
        $(document).on("click", ".copy_icon", function(){
            copyToClipboard($(this).parent().find(".prompt_string").html().br2nl().replace(/<[^>]*>/g, ''));
        });
    });
});
