<template>
    <div>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
    </div>
</template>
<style>
.markdown-style{
    border-left: 8px solid rebeccapurple;
    padding: 10px;
}
</style>