angular.module('categories',[
		'myApp.models.categories'
])
.config(function($stateProvider){
	$stateProvider
		.state('my-app.categories',{
			url:'/categories',
			controller:'CategoriesListController as categoriesListCtrl',
			templateUrl:'app/categories/categories-list-tmpl.html'

			/*views:{'categories@':{
					controller:'categoriesCtrl as categoriesCtrl',
					templateUrl:'app/categories/categories-list-tmpl.html'
				}
			}*/
		})
		.state('my-app.create-category',{
			url:'/categories/create/:id',
			controller:'CategoriesCreateController as categoriesCreateCtrl',
			templateUrl:'app/categories/categories-form-tmpl.html'
		})

})
.controller('CategoriesListController',function($state,CategoriesModel){
		var categoriesListCtrl = this;
console.log('here cat==>>');
		// Categories List
		CategoriesModel.getCategories()
			.then(function(result){
				categoriesListCtrl.categories = result;
		});	

		categoriesListCtrl.deleteCategory = CategoriesModel.deleteCategory;
		
})
.controller('CategoriesCreateController',function($state,$stateParams,CategoriesModel){
		var categoriesCreateCtrl = this;
		var isNewCategory = true;

		function returnToCategoriesList() {
            $state.go('my-app.categories');
        }

        function cancel(){
        	returnToCategoriesList();
        }	

		function createCategory(){
			if(isNewCategory)
				CategoriesModel.createCategory(categoriesCreateCtrl.category);
			else
				CategoriesModel.updateCategory(categoriesCreateCtrl.category);
			returnToCategoriesList();
		}

		function resetForm(){
			categoriesCreateCtrl.category = {
				title :'',
				description : ''
			}
		}

		console.log($stateParams.id);
		if($stateParams.id){
			isNewCategory = false;
			var id = $stateParams.id;
			CategoriesModel.getCategoryById(id)
				.then(function(result){
					categoriesCreateCtrl.category = result;
				});
		}
		else
			resetForm();


		categoriesCreateCtrl.createCategory = createCategory;
		categoriesCreateCtrl.deleteCategory = CategoriesModel.deleteCategory;
		categoriesCreateCtrl.cancel = cancel;

		
})


