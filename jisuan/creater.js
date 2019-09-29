(function (jQuery) {
    const $ = jQuery;
    var MAX_NUM_ONE_LINE = 5;
    var MAX_HEIGHT_FOR_PRINT = 950;
    const getRandom = function(min=10, max=100) {
        return min + Math.round(Math.random() * (max - min));
    };

    const getOperationalSymbol = function () {
        const rand = Math.floor(Math.random() * 10);
        if (rand > 4) {
            return "+";
        }
        return "-";
    };

    const getQueue = function (range) {
        const queue = [];
        for(var i=0; i<range; i++) {
            queue.push(getRandom());
            if (i < range - 1) {
                queue.push(getOperationalSymbol());
            }
        }
        return queue;
    };

    const generateQuestion = function (range) {
        while (true) {
            const queue = getQueue(range).join("");
            const res = eval(queue);
            console.log(queue, "=", res);
            if (res < 0) {
                continue;
            } else {
                return queue;
            }
        }

    };

    const $root = $("body");
    const table = [
        "<table>", "</table>"
    ].join("");
    const row = [
        "<tr>",
        "</tr>"].join("");

    const createLine = function () {
        let $row = $(row);
        for(let i=0;i<MAX_NUM_ONE_LINE;i++) {
            let td = `<td>${generateQuestion(3)} =</td>`;
            let $td = $(td);
            $row.append($td);
        }
        return $row;
    };

    const create = function() {
        const $table = $(table);
        for(let i=0; i<12; i++) {
            let line = createLine();
            $table.append(line);
        }
        $root.append($table);
    };

    // generateQuestion(3);
    create();

})(jQuery);