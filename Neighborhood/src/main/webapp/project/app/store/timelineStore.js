Ext.define('Neighborhood.store.timelineStore',{
	
	extend: 'Ext.data.Store',
	//singleton:true,
	config: {	
		model: 'Neighborhood.model.timelineModel',
	    autoLoad : false,
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    },
	    data :[
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/signin-bg-5.jpg',
	            	title : 'Lorem ipsum dolor sit amet',
	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '1h ago',
	            	commentsArr : []
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/signin-bg-5.jpg',
	            	title : '',
	            	description  : '<a href="#">Denise Steiner</a> shared an image on <a href="#">The Gallery</a>',
	            	imageUrl : 'resources/images/timeline/signin-bg-5.jpg',
	            	imageComment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	            	time : '2h ago',
	            	commentsArr : []
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/2.jpg',
	            	title : '<a href="#">Robert Jang</a> commented on <a href="#">The Article</a>',
	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '3h ago',
	            	commentsArr : []
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/5.jpg',
	            	title : '',
	            	description  : '<a href="#">Denise Steiner</a> followed <a href="#">Johg Doe</a>',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '4h ago',
	            	commentsArr : []
	            },
	            //Yesterday
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/5.jpg',
	            	title : '',
	            	description  : '<a href="#">Denise Steiner</a> liked a comment on <a href="#">Some Article</a>',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '9:02 pm',
	            	commentsArr : [{
	            		commentText : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	            		time : '2 days ago',
	            		likes : '',
	            		user_name : 'Michelle Bortz',
	            		user_pic : 'resources/images/timeline/3.jpg'
	            	}]
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/5.jpg',
	            	title : '',
	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '5:47 pm',
	            	commentsArr : []
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/5.jpg',
	            	title : '',
	            	description  : '<a href="#">Denise Steiner</a> liked <a href="#">Shop Item</a>',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '2:35 pm',
	            	commentsArr : []
	            },
	            { userName : '' ,
	            	userPic : 'resources/images/timeline/5.jpg',
	            	title : 'Lorem ipsum dolor sit amet',
	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	            	imageUrl : '',
	            	imageComment : '',
	            	time : '11:21 am',
	            	commentsArr : []
	            }
	            
	            ]
	}
});

