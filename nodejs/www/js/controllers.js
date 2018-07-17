var _currencyUrl = "./currencies.json";

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$http', '$stateParams', function($scope, $http) {

    $scope.addNumber = function(num) {
        // If the current number is 0 and the user adds 0 to the current number
        // We do nothing
        if ($scope.from.toString() == "0" && num == 0) {
            return;
        } else if ($scope.from.toString() == "0" && num > 0) {
            // If not, we clear the string then we add number 
            $scope.from = "";
        }

        // Add number
        if ($scope.totalDigits < $scope.maxDigits) {
            $scope.from = $scope.from.toString() + num;
            $scope.totalDigits++;
            $scope.convert();
        }
    }

    $scope.addDecimal = function() {
        // We don't allow "." to be added after 5 digits
        if ($scope.totalDigits < $scope.maxDigits) {

            // We only allow one "." to be added
            if (!$scope.isDecimal) {
                $scope.isDecimal = true;
                $scope.from = $scope.from.toString() + ".";
            }

            $scope.convert();
        }
    }

    $scope.del = function() {
        if ($scope.from.length > 0) {
            // If the last character is ".", we reset the decimal flag
            if ($scope.from[$scope.from.length - 1] == ".") {
                $scope.isDecimal = false;
                // Remove the last character
                $scope.from = $scope.from.substring(0, $scope.from.length - 1);
            } else {
                // Remove the last character
                $scope.from = $scope.from.substring(0, $scope.from.length - 1);
                $scope.totalDigits--;
            }
        }

        // Reset number to 0
        if ($scope.from.length == 0) {
            $scope.from = 0;
        }

        $scope.convert();
    }

    $scope.convert = function() {
        var toStr = parseFloat($scope.from) * parseFloat($scope.currentConverter.ratio);
        // Round up number and remove insignificant trailing zeros from a number that appears in some cases
        // Ex: 5 * 0.78 could end up being 3.9000000000000004
        $scope.toStr = $scope.numberWithCommas(Number(parseFloat(toStr).toPrecision(5)).toString());
        $scope.fromStr = $scope.numberWithCommas($scope.from);
    }

    // Util function to convert number to currency
    $scope.numberWithCommas = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $scope.updateConverter = function(index) {
        $scope.reset();
        $scope.convertionIndex = index;
        $scope.currentConverter = $scope.currencyData[index];
    }

    $scope.loadData = function() {
        // Load data source
        $http.get(_currencyUrl).then(
            function(response) {
                // Store data
                $scope.currencyData = response.data; // If this step, the sideMenu will be generated automatically
                // Update converter
                $scope.currentConverter = $scope.currencyData[$scope.convertionIndex];
            },
            function(err) {
                // failure call back
                alert(err);
            }
        );
    }

    $scope.checkEnv = function() {
        $scope.isDesktopOrLandscape = true;

        // Check if mobile and if desktop width < 992 (medium device) 
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $scope.isDesktopOrLandscape = false;

            if (window.innerWidth > window.innerHeight) {
                //console.log("This is Landscape!");
                $scope.isDesktopOrLandscape = true;
            } else {
                $scope.isDesktopOrLandscape = false;
            }
        } else if (window.innerWidth < MID_DEVICE_WIDTH) {
            $scope.isDesktopOrLandscape = false;
        }

        // Add listener to detect when viewport is changed to landsacpe
        window.addEventListener("resize", function() {
            // Check if landscape
            if (window.innerWidth > window.innerHeight || window.innerWidth > MID_DEVICE_WIDTH) {
                //console.log("This is Landscape!");
                $scope.isDesktopOrLandscape = true;
                $scope.$apply(); // Make sure that the ui is updated
            } else {
                $scope.isDesktopOrLandscape = false;
                $scope.$apply(); // Make sure that the ui is updated
            }
        }, false);
    }

    $scope.reset = function() {
        $scope.convertionIndex = 0;
        // Reset values
        $scope.from = 0;
        $scope.toStr = 0;
        $scope.fromStr = 0;
        $scope.totalDigits = 0;
        $scope.maxDigits = 5;
        $scope.isDecimal = false;
    }

    // Init 
    $scope.reset();
    $scope.loadData();
    $scope.checkEnv();

}])

.controller('ConverterCtrl', ['$scope', function($scope) {

}]);
