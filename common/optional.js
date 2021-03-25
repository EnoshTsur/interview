function optional(value) {

    const isEmpty = () => value == null
    const empty = () => optional(null)

    function map(mapper) {
        return isEmpty() ? empty() : optional(mapper(value))
    }

    function filter(predicate) {
        return predicate(value) ? optional(value) : empty()
    }

    function orElse(other) {
        return isEmpty() ? other : value
    }

    function orElseGet(supplier) {
        return isEmpty() ? supplier() : value
    }

    function ifPresent(consumer) {
        if (value && typeof consumer === 'function') {
            consumer(value)
        }
    }

    return {map, filter, orElse, orElseGet, ifPresent,}
}

module.exports = optional