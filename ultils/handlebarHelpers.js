

class handlebarHelpers {
    sum(a, b) {
        return a + b
    }


    sortable(column, sort) {
        const sortType = column === sort.column ? sort.type: 'default'

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        }
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a href="?_sort&column=${column}&type=${type}"><span class="${icon}"></span></a>`
    }


    pagination(current, pages, path) {
        var html
        if (pages > 0) {
            html = `<ul class="pagination pagination-lg">`
            
        }
        // fist item
        if (current == 1) {
            html += `
            <li class="page-item disabled">
                <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href=${path}/">First</a>
            </li>
            `
        } else {
            html += `
            <li class="page-item">
                <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="${path}/">First</a>
            </li>
            `
        }
        // Item
        var i = (Number(current) > 3 ? Number(current) - 2 : 1)
        if (i != 1) {
            html += `
            <li class="page-item">
                <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="#">...</a>
            </li>
            `
        }
        for(; i <= (Number(current) + 2) && i <= pages; i++){
            if(i === Number(current)) {
                html += `
                <li class="page-item active">
                    <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="/shop${path}/${i}">${i}</a>
                </li>
                `
            }else {
                html += `
                <li class="page-item">
                    <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="/shop${path}/${i}">${i}</a>
                </li>
                `
            }
            if(i === (Number(current) + 2) && i < pages) {
                html += `
                <li class="page-item">
                    <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="#">...</a>
                </li>
                `
            }
        }
        //  Last item
        if(current == pages) {
            html += `
            <li class="page-item disabled">
                <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="${path}/">Last</a>
            </li>
            `
        }else {
            html += `
            <li class="page-item">
                <a class="page-link rounded-0 mr-3 border-top-0 border-left-0" href="${path}/">Last</a>
            </li>
            `
        }
        html += `</ul>`
        return html
    }
}


module.exports = new handlebarHelpers 