angular.module('categories.subcategories',[
	'myApp.models.categories',
		'myApp.models.subcategories'
])
.config(function($stateProvider){
	$stateProvider
		.state('my-app.categories.subcategories',{
			url:'/subcategories',
			/*controller:'SubcategoriesListController as subcategoriesListCtrl',
			templateUrl:'app/categories/subcategories/subcategories-list-tmpl.html'*/

			views:{'@my-app':{
					controller:'SubcategoriesListController as subcategoriesListCtrl',
					templateUrl:'app/categories/subcategories/subcategories-list-tmpl.html'
				}
			}
		})
		.state('my-app.create-subcategory',{
			url:'/subcategories/create/:id',
			views:{'@my-app':{
					controller:'SubcategoriesCreateController as subcategoriesCreateCtrl',
					templateUrl:'app/categories/subcategories/subcategories-form-tmpl.html'
				}
			}
			
		})

})
.controller('SubcategoriesListController',function($state,SubcategoriesModel){
		var subcategoriesListCtrl = this;

		console.log('here==>>');
		// Categories List
		SubcategoriesModel.getSubcategories()
			.then(function(result){
				subcategoriesListCtrl.subcategories = result;
		});	

		subcategoriesListCtrl.deleteSubcategory = SubcategoriesModel.deleteSubcategory;
		
})
.controller('SubcategoriesCreateController',function($state,$stateParams,SubcategoriesModel){
		var subcategoriesCreateCtrl = this;
		var isNewSubcategory = true;

		function returnToSubcategoriesList() {
            $state.go('my-app.categories.subcategories');
        }

        function cancel(){
        	returnToSubcategoriesList();
        }	

		function createSubcategory(){
			if(isNewSubcategory)
				SubcategoriesModel.createSubcategory(subcategoriesCreateCtrl.subcategory);
			else
				SubcategoriesModel.updateCategory(subcategoriesCreateCtrl.subcategory);
			returnToSubcategoriesList();
		}

		function resetForm(){
			subcategoriesCreateCtrl.subcategory = {
				title :'',
				description : ''
			}
		}

		if($stateParams.id){
			isNewCategory = false;
			var id = $stateParams.id;
			SubcategoriesModel.getSubcategoryById(id)
				.then(function(result){
					subcategoriesCreateCtrl.subcategory = result;
				});
		}
		else
			resetForm();


		subcategoriesCreateCtrl.createSubcategory = createSubcategory;
		subcategoriesCreateCtrl.deleteSubcategory = SubcategoriesModel.deleteSubcategory;
		subcategoriesCreateCtrl.cancel = cancel;

		
})


