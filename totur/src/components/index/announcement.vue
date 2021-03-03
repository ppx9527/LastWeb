<template>
    <div>
        <header class="time-title">
            <span>公告</span>
            <h1>时间轴</h1>
        </header>
        <div class="main">
            <ul class="cbp_tmtimeline">
                <li v-for="(announcement, index) in announcements" :key="index">
                    <time class="cbp_tmtime" :datetime="announcement.end_time">
                        <span>{{announcement.end_time | datetime('date')}}</span>
                        <span>{{announcement.end_time | datetime('time')}}</span>
                    </time>
                    <div class="cbp_tmicon"><i class="fa fa-ravelry"></i></div>
                    <div class="cbp_tmlabel">
                        <h2>{{ title(announcement.setting_name) }}</h2>
                        <p>
                            {{ announcement.value }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['userType'],
    data(){
        return {
            announcements:[]
        }
    },
    methods: {
        getAnnouncement(page){
            this.$http.get('https://honi.top/zeshi/public/api/common/getNotice', {
                params: {
                    userType: this.$store.getters.getUserType,
                    openId: this.$store.getters.getOpenId,
                    page
                }
            }).then(Response => {
                let state = Response.body;
                if (state.code === 200) {
                    this.announcements.push(state.data);
                }
            });
        },
        title(type) {
            if (this.userType == 0)
                return type === 'student_notice' ? '系统公告' : '导师公告'
            else
                return type === 'tutor_notice' ? '系统公告' : '公告'
        }
    },
    created() {
        this.getAnnouncement('index');
        this.getAnnouncement('tutor');

    },
    filters:{
        datetime (value,flag){
            let time = new Date(parseInt(value) * 1000);
            if(flag === 'date'){
                return time.toLocaleDateString();
            } else {
                return time.toTimeString().substring(0,5);
            }
        }
    }
}
</script>
<style>
.time-title{
	width: 95%;
	max-width: 69em;
    padding: 2.875em 1.875em 1.875em;
    margin: 0 auto 2em;
    color: #47a3da;
}

.time-title h1 {
	font-size: 2.125em;
	line-height: 1.3;
	margin: 0;
	float: left;
	font-weight: 400;
}

.time-title span {
	display: block;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5em;
	padding: 0 0 0.6em 0.1em;
}

.cbp_tmtimeline {
	margin: 30px 0 0 0;
	padding: 0;
	list-style: none;
	position: relative;
} 

/* The line */
.cbp_tmtimeline:before {
	content: '';
	position: absolute;
	top: 0;
	bottom: 0;
	width: 10px;
	background: #afdcf8;
	left: 20%;
	margin-left: -10px;
}

/* The date/time */
.cbp_tmtimeline > li .cbp_tmtime {
	display: block;
	width: 25%;
	padding-right: 100px;
	position: absolute;
}

.cbp_tmtimeline > li .cbp_tmtime span {
	display: block;
	text-align: right;
}

.cbp_tmtimeline > li .cbp_tmtime span:first-child {
	font-size: 0.9em;
	color: #bdd0db;
}

.cbp_tmtimeline > li .cbp_tmtime span:last-child {
	font-size: 2.9em;
	color: #3594cb;
}

.cbp_tmtimeline > li:nth-child(odd) .cbp_tmtime span:last-child {
	color: #6cbfee;
}

/* Right content */
.cbp_tmtimeline > li .cbp_tmlabel {
	margin: 0 0 15px 25%;
	background: #3594cb;
	color: #fff;
	padding: 2em;
	font-size: 1.2em;
	font-weight: 300;
	line-height: 1.4;
	position: relative;
	border-radius: 5px;
}

.cbp_tmtimeline > li:nth-child(odd) .cbp_tmlabel {
	background: #6cbfee;
}

.cbp_tmtimeline > li .cbp_tmlabel h2 { 
	margin-top: 0px;
	padding: 0 0 10px 0;
	border-bottom: 1px solid rgba(255,255,255,0.4);
}

/* The triangle */
.cbp_tmtimeline > li .cbp_tmlabel:after {
	right: 100%;
    content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
    border: 10px solid transparent;
    border-right-color: #3594cb;
    top: 10px;
}

.cbp_tmtimeline > li:nth-child(odd) .cbp_tmlabel:after {
	border-right-color: #6cbfee;
}

/* The icons */
.cbp_tmtimeline > li .cbp_tmicon {
	width: 40px;
	height: 40px;
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	font-size: 1.4em;
	line-height: 40px;
	-webkit-font-smoothing: antialiased;
	position: absolute;
	color: #fff;
	background: #46a4da;
	border-radius: 50%;
	box-shadow: 0 0 0 8px #afdcf8;
	text-align: center;
	left: 20%;
	top: 0;
	margin: 0 0 0 -25px;
}

.cbp_tmicon-phone:before {
	content: "\e000";
}

.cbp_tmicon-screen:before {
	content: "\e001";
}

.cbp_tmicon-mail:before {
	content: "\e002";
}

.cbp_tmicon-earth:before {
	content: "\e003";
}

/* Example Media Queries */
@media screen and (max-width: 65.375em) {

	.cbp_tmtimeline > li .cbp_tmtime span:last-child {
		font-size: 1.5em;
	}
}

@media screen and (max-width: 47.2em) {
	.cbp_tmtimeline:before {
		display: none;
	}

	.cbp_tmtimeline > li .cbp_tmtime {
		width: 100%;
		position: relative;
		padding: 0 0 20px 0;
	}

	.cbp_tmtimeline > li .cbp_tmtime span {
		text-align: left;
	}

	.cbp_tmtimeline > li .cbp_tmlabel {
		margin: 0 0 30px 0;
		padding: 1em;
		font-weight: 400;
		font-size: 95%;
	}

	.cbp_tmtimeline > li .cbp_tmlabel:after {
		right: auto;
		left: 20px;
		border-right-color: transparent;
		border-bottom-color: #3594cb;
		top: -20px;
	}

	.cbp_tmtimeline > li:nth-child(odd) .cbp_tmlabel:after {
		border-right-color: transparent;
		border-bottom-color: #6cbfee;
	}

	.cbp_tmtimeline > li .cbp_tmicon {
		position: relative;
		float: right;
		left: auto;
		margin: -55px 5px 0 0px;
	}	
}
</style>