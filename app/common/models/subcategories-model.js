angular.module('myApp.models.subcategories',[

])
.service('SubcategoriesModel',function($http,$q){
	var model = this,
		URLS={
			FETCH:'app/data/subcategories.json'
		},
		subcategories;

		function cacheSubcategories(result){
			subcategories = result.data;
			return subcategories;
		}

		model.getSubcategories = function(){
			return (subcategories)?$q.when(subcategories):$http.get(URLS.FETCH).then(cacheSubcategories);
		}

		model.getSubcategoryById = function(id){
			var deferred = $q.defer();

			function findCategory(id){
				return _.find(subcategories,function(cat){
					 return cat.id == id;
				});
			}

			if(subcategories){
				deferred.resolve(findCategory(id));
			}
			else{
				model.getSubcategories()
					.then(function(){
						deferred.resolve(findCategory(id));
					})
			}

			return deferred.promise;

		}

		model.createSubcategory = function(category){
			if(category){
				category.id = subcategories.length;
				subcategories.push(category);
			}
		}

		model.updateCategory = function(category){
			if(category){
				var index = _.findIndex(subcategories,function(cat){
					return cat.id == category.id;
				});
				subcategories[index] = category;

			}
		}

		model.deleteCategory = function(category){
			_.remove(subcategories,function(cat){
					return cat.id == category.id;
			});
		}
})