
const srart_pos = 90.75;
const item_count = 13;
const s = 0.52 * Math.PI / 180; 

var pos = [];
var elem = document.getElementsByClassName('item');

function allocationItems() {
    //首先设置第7个元素处于中间最大的位置
    var i;
    var pp = elem[6].getElementsByTagName('a')[0].getAttribute('data-img');
    document.getElementById("pic").style.backgroundImage = "url('" + pp + "')";
    document.getElementById("pic").className = "img-box";

    //计算其它菜单项的位置
    pos[0] = srart_pos;
    for (i = 1; i < item_count; i++) {
        pos[i] = pos[i - 1] - 0.2;
        last_pos = pos[i];
    }
    for (i = 0; i < item_count + 1; i++) {
        elem[i].style.left = 240 + 250 * Math.sin(pos[i]) + 'px';
        elem[i].style.top = 240 + 250 * Math.cos(pos[i]) + 'px';
    }
}
allocationItems();



function animation(args, flag) {
    var $ = {
        radius: 250, //圆周半径
        speed: 10 // 速度单位
    }
    var e = elem;
    document.getElementById("pic").className = "hide";
    console.log(3);
    
    function animate(draw, duration, callback) {
        console.log(4);
        
        var start = performance.now();


        requestAnimationFrame(function run(time) {
           
            console.log(5);
            // 自启动来的时差
            var timePassed = time - start;
            console.log(time, start)
            // 不能最大持续时间
            if (timePassed > duration)
                timePassed = duration;
            //重新绘制菜单项的位置
            draw();
            console.log(6);
            if (timePassed < duration) {
                console.log(7);
                requestAnimationFrame(run);
            } else 
            {
                console.log(8);
                callback();
                console.log(9);
            }
        });
    }
    //执行函数
    animate(function () {
        console.log(1);
        var i;
        for (i = 0; i < item_count; i++) {
            
           
            e[i].style.left = 240 + $.radius * Math.sin(pos[i]) + 'px';
            e[i].style.top = 240 + $.radius * Math.cos(pos[i]) + 'px';
            if (flag) {
                pos[i] += s;
            } else {
                pos[i] -= s;
            }
        }   /* callback function */
    }, 400, function changeItems() {
        console.log(2);
        var list = document.getElementById('list');
        var ch = flag ? list.firstElementChild : list.lastElementChild
        ch.remove();
        if (flag) {
            list.appendChild(ch);
        } else {
            list.insertBefore(ch, list.firstChild);
        }
        allocationItems();
    });
}