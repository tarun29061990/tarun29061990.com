/***APPLICATION***/

var App=Ember.Application.create({

});


/***MODEL***/

App.Master=Ember.Object.extend({
	me_url:null,
	facebook_url:null
});

/***VIEW***/
App.ApplicationView=Ember.View.extend({
	templateName:'application'
});

App.NameTextView=Ember.TextField.extend();
App.EmailTextView=Ember.TextField.extend();
App.MessageTextView=Ember.TextArea.extend();

/*App.IndexView=Ember.View.extend({
	templateName:'index'
});*/
App.AboutView=Ember.View.extend({
	templateName:'about'
});

App.BlogView=Ember.View.extend({
	templateName:'blog'
});

App.ProjectsView=Ember.View.extend({
	templateName:'projects'
});

App.ContactView=Ember.View.extend({
	templateName:'contact'
});

App.NavigationView=Ember.View.extend({
	templateName:'navigation',
	selectedBinding:'controller.selected',
	NavItemView:Ember.View.extend({
		tagName:'li',
		classNameBindings:'isActive:active'.w(),
		isActive:function(){
			return this.get('item')==this.get('parentView.selected');
		}.property('item','parentView.selected').cacheable()
	})
});

/***CONTROLLER***/
App.NavigationController=Ember.Controller.extend();
App.ApplicationController=Ember.Controller.extend();
//App.IndexController=Ember.ArrayController.extend();
App.AboutController=Ember.ArrayController.extend({

});

App.BlogController=Ember.ArrayController.extend({

});

App.ProjectsController=Ember.ArrayController.extend({});
App.ContactController=Ember.ArrayController.create({
	content:[],
	name:"",
	email:"",
	message:"",

	sendmail:function(){
		var self=this;
		name=self.get("name");
		email=self.get("email");
	    message=self.get("message");

	    var varData="name="+name+"&email="+email+"&message="+message;
	    var error="";
	    var email_exp = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		var string_exp = /^[A-Za-z .'-]+$/;
		
		if(!name.match(string_exp))
			error+="Name is not valid \n";
		
		if(!email.match(email_exp))
			error+="Email is not valid \n";
		
		if(message.length<2)
			error+="Message is not valid \n";
		
		if(error.length>1)
		{
			alert("I am Sorry but there are some errors mentioned below \n"+error+"\nKindly fix these Errors");
		}
		else
		{
			$.ajax({
		 		type:'POST',
		 		url:'send_form_mail.php',
		 		data: varData,
	 			success:function(){
				alert("Thanks.. I have Received your message.. will reply very soon !!");
		 		}
			});
		}

		 
		
		 	
		
	}

	

});


App.masterController=Ember.ArrayController.create({
	content:[
		App.Master.create({
			me_url:"https://graph.facebook.com/tarun29061990/picture?type=large",
		    facebook_url:"https://www.facebook.com/tarun29061990/",
		})
	]
});



/***ROUTER***/

App.Router=Ember.Router.extend({
	root:Ember.Route.extend({

		showAbout:Ember.Route.transitionTo('about'),
		showBlog:Ember.Route.transitionTo('blog'),
		showProjects:Ember.Route.transitionTo('projects'),
		showContact:Ember.Route.transitionTo('contact'),
		
		index:Ember.Route.extend({
				route:'/',
				connectOutlets:function(router){
					router.get('applicationController').connectOutlet('navigation','navigation');
				},

				//STATES

				about:Ember.Route.extend({
					route:'/',
					connectOutlets:function(router){
						router.set('navigationController.selected','about');
						router.get('applicationController').connectOutlet('about');
					}
				}),

				blog:Ember.Route.extend({
					route:'/blog',
					connectOutlets:function(router){
						router.set('navigationController.selected','blog');
						router.get('applicationController').connectOutlet('blog');
					}
				}),

				projects:Ember.Route.extend({
					route:'/projects',
					connectOutlets:function(router){
						router.set('navigationController.selected','projects');
						router.get('applicationController').connectOutlet('projects');
					}

				}),

				contact:Ember.Route.extend({
					route:'/contact',
					connectOutlets:function(router){
						router.set('navigationController.selected','contact');
						router.get('applicationController').connectOutlet('contact');
					}

				})
			
		})
			
	})

	
});
App.initialize();
