FrontPlaster.prototype.table_paginator = function(){
    
    var table_tag, controls_tag, table, n, rowCount, firstRow, hasHead, tr, i, ii, j, k, th, pageCount, previous_text, next_text, active_class, unactive_class, next_class, previous_class, animate;

    var paginateTable = (function (p_n, p_table_tag, p_controls_tag, p_previous_text, p_next_text, p_active_class="btn btn-primary", p_unactive_class="btn btn-default", p_next_class="btn btn-primary", p_previous_class="btn btn-primary", p_animate = true){
        table_tag = p_table_tag;
        previous_text = p_previous_text;
        next_text = p_next_text;
        active_class = p_active_class;
        unactive_class = p_unactive_class; 
        next_class = p_next_class;
        previous_class = p_previous_class;
        controls_tag = p_controls_tag;
        animate = p_animate;
        table = document.getElementById(p_table_tag);
        n = p_n;
        rowCount = table.rows.length;
        firstRow = table.rows[0].firstElementChild.tagName;
        hasHead = (firstRow === "TH");
        tr = [];
        i,ii,j = (hasHead)?1:0;
        th = (hasHead?table.rows[(0)].outerHTML:"");
        //rowCount-1 to avoid table header issue
        pageCount = Math.ceil((rowCount-1) / n);
        if (pageCount > 1) {
            for (i = j,ii = 0; i < rowCount; i++, ii++)
                tr[ii] = table.rows[i].outerHTML;
                sort(1);
        }
    });


    var sort = (function(p) {
        let rows = th,s = ((n * p)-n);
        for (i = s; i < (s+n) && i < tr.length; i++)
            rows += tr[i];
        
        table.innerHTML = rows;
        let table_controls = Array.prototype.slice.call(document.getElementsByClassName(controls_tag));
        table_controls.map(element => element.innerHTML = pageButtons(pageCount,p));
        let table_buttons = Array.prototype.slice.call(document.getElementsByClassName("id"+p));
        table_buttons.map(element => element.setAttribute("class","active "+active_class));

        if(animate){
            var all_tr = Array.prototype.slice.call(document.getElementById(table_tag).getElementsByTagName("tr"));
            for(i=0; i< all_tr.length; i++){
                all_tr[i].style.visibility = "hidden";
                //for context error 
                let h = i;
                setTimeout(function(){
                    all_tr[h].style.visibility = "visible"; 
                }, (i*50));
            }
        }
        
    });

    var pageButtons = (function(pCount,cur) {
        let prevDis = (cur == 1)?"disabled":"",
            nextDis = (cur == pCount)?"disabled":"",
            buttons = "<input class='"+previous_class+"' type='button' id='previous_button' value='"+previous_text+"' onclick='sort("+(cur - 1)+")' "+prevDis+">";
        for (i=1; i<=pCount;i++)
            buttons += "<input class='"+unactive_class+" id"+i+"' type='button' value='"+i+"' onclick='sort("+i+")'>";
        buttons += "<input class='"+next_class+"' type='button' id='next_button' value='"+next_text+"' onclick='sort("+(cur + 1)+")' "+nextDis+">";
        return buttons;
    }); 

}