<style lang='sass' scoped>

#vue-expanding-preview {
    float: left;
    position: relative;
}

</style>

<template>

<div id='vue-expanding-preview' class='vue-expanding-preview'>
    <slot name='content' v-if='expanded'></slot>
</div>

</template>

<script>

var card = require('vue-mdl').MdlCard
var $ = require('jquery')
    //var _ = require('underscore')
var lastSelectorId = -1

function resizeFn() {
    SetGridPosition(lastSelectorId, true)
}

function InitResize() {
    window.removeEventListener('resize', resizeFn)

    if ($('.vue-expanding-preview').length !== 0) {
        window.addEventListener('resize', resizeFn, false)
    }
}

function goToByScroll(id) {
    var diff = $('#' + id).offset().top + $('#' + id).height() - 50
    $('html,body').animate({
            scrollTop: diff
        },
        'slow')
}

function ExecuteExpanded(selectorId, forceResize) {
    //find the next div that starts after the end of this one
    var item = $('#' + selectorId)
    if (item.length === 0) {
        console.log('warning - item couldnt be found:' + selectorId)
        return
    }
    var bottom = item.offset().top
    var nextitem = Array.find(item.siblings(),
        function(e, i, a) {
            return $(e).offset().top > bottom
        })

    //overriding placement
    var cl = item.closest('.js-vue-expanding-preview-after-this')
    InitResize()
    if (cl.length === 1) {
        $('#vue-expanding-preview').insertAfter(cl[0])
    }
    //no next item
    else if (typeof(nextitem) === 'undefined') {
        if (item.is(':last-child')) {
            $('#vue-expanding-preview').insertAfter(item)
        } else {
            $('#vue-expanding-preview').insertAfter(item.siblings().last())
        }

    } else {
        $('#vue-expanding-preview').insertBefore($(nextitem))
    }

    SetGridPosition(forceResize)
    if (lastSelectorId !== -1) {
        //scroll screen
        goToByScroll(selectorId)
    }

    lastSelectorId = selectorId
    return true
}

function SetGridPosition(forceResize) {
    //set width to match body
    var width = $('body').width()
    $('#vue-expanding-preview').width(width)

    //set left to match body
    $('#vue-expanding-preview').css('left', 0)
    var left = $('#vue-expanding-preview').offset().left
    if (left > 0 || forceResize) {
        $('#vue-expanding-preview').css('left', -left)
    }
}

//var _ = require('underscore-node')

module.exports = {


    props: {
        selectorId: {
            type: Number,
            required: true
        }
    },
    data: function() {
        return {
            expanded: false
        }
    },
    watch: {
        'selectorId': function(val, oldVal) {
            if ($('#vue-expanding-preview').length === 0) {
                return
            }

            //move expander if closed
            if (this.selectorId === -1) {
                $('#vue-expanding-preview').insertAfter('body')
                return
            }
            this.expanded = ExecuteExpanded(this.selectorId, false)
        }
    },
    components: {
        'mdl-card': card
    }
}

</script>
