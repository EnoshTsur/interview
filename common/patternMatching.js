function equals(e1, e2) {

    function arrayEquals(a1, a2) {
        return a1 === a2 || (
            a1 != null && a2 != null &&
            a1.length === a2.length &&
            a1
                .map(val => a2.find(val2 => equals(val, val2)) != null)
                .reduce((pre ,next) => pre && next, true)
        )
    }

    function objectEquals(o1, o2) {
        return o1 === o2 || (
            o1 != null && o2 != null &&
            Object.keys(o1).length === Object.keys(o2).length &&
            Object.entries(o1)
                .map(([k1, v1]) => Object.entries(o2)
                    .find(([k2, v2]) => equals(k1, k2) && equals(v1, v2)) != null)
                .reduce((pre, next) => pre && next, true)
        )
    }

    function equalsAny(any1, any2) {
        return Array.isArray(any1) && Array.isArray(any2) ?
            arrayEquals(any1, any2) :
            typeof any1 === 'object' && typeof any2 === 'object' ?
                objectEquals(any1, any2) :
                any1 === any2
    }

    return e2 != null ? equalsAny(e1, e2) : e => equalsAny(e1, e)
}

function match(value, done=false) {
    return {
        when: (p, r) => {
            if(done) return match(value, true);
            const predicate = typeof p === 'function' ?
                p(value):
                typeof p === 'boolean' ? p :
                    Array.isArray(p) && !Array.isArray(value) ? p.includes(value) :
                        equals(p, value)
            const result = typeof r === 'function' ?
                () => r(value) : () => r
            return predicate ? match(result(), true) : match(value)
        },
        orElse: other => !done ? other :  value,
        orElseGet: supplier => !done ? supplier() : value,

    }
}


module.exports = {
    match,
    equals,
}