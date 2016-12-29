﻿(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("viewCtrl",
                     ["productResource", "$scope", "$routeParams", viewCtrl]);

    function viewCtrl(productResource, $scope, $routeParams) {
        var vm = this;        
        vm.quoteid = "QTN/Orbit/001/10-11-16";        
        productResource.query({ search: '', quoteid: vm.quoteid }, function (response) {
            vm.quote = response[0];
        });

        productResource.query({ quoteid: vm.quoteid }, function (response) {
            vm.quoteDetails = response;

            angular.forEach(vm.quoteDetails, function (obj) {
                obj["showEdit"] = true;
            })
        });

        $scope.toggleEdit = function (quote) {
            quote.showEdit = quote.showEdit ? false : true;
        }

        productResource.query(function (data) {
            vm.products = data;
        });

        $scope.addRow = function () {
            vm.quoteDetails.push({
                'catNo': $scope.catNo, 'unit': $scope.unit, 'description': $scope.description, 'make': $scope.make, 'unitPrice': $scope.unitPrice, 'quantity': $scope.quantity, 'extPrice': $scope.extPrice,
                'vat': $scope.vat, 'totalValue': $scope.totalValue, 'leadTime': $scope.leadTime
            });
            $scope.catNo = '';
            $scope.unit = '';
            $scope.make = '';
            $scope.description = '';
            $scope.unitPrice = '';
            $scope.quantity = '';
            $scope.extPrice = '';
            $scope.vat = '';
            $scope.totalValue = '';
            $scope.leadTime = '';            
        };

        $scope.removeRow = function (name) {
            alert(name);
            var index = -1;
            var comArr = eval(vm.quoteDetails);            
            for (var i = 0; i < comArr.length; i++) {                
                if (comArr[i].catNo === name) {                    
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            vm.quoteDetails.splice(index, 1);
        };
    }

}());