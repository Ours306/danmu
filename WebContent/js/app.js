var app = angular.module("app",[]);

app.controller("controller",["$rootScope","$scope","$timeout", function($rootScope,$scope,$timeout) {
	
	var issueTitle = angular.element("#issueTitle");
	var title = "正方：大学生谈恋爱利大于弊 \n 反方：大学生谈恋爱弊大于利";
	$scope.title= "正方：大学生谈恋爱利大于弊";
	var startIndex = 0;

	$rootScope.state = 1;

	$scope.pre = function() {
		$rootScope.state--;
	}

	$scope.next = function() {
		$rootScope.state++;
	}

	$scope.showTitle = function() {
		if(title[startIndex] == "&") return;

		issueTitle.append("<span>"+ title[startIndex] +"</span>");

		$timeout($scope.showTitle,500);
	}

	$scope.subState = 1;

	$scope.changeOne = function(state) {
		$scope.subState = state;
	}

	$scope.oneTime1 = 180;
	$scope.oneTime2 = 180;
	$scope.oneTime3 = 120;
	$scope.oneTime4 = 120;

	$scope.oneTime5 = 480;
	$scope.oneTime6 = 480;

	$scope.isStart_1 = false;
	$scope.oneTimeChange1 = function() {
		$scope.isStart_1 = !$scope.isStart_1;
		if($scope.isStart_1) {
			$scope.freeSay3();
		}else return;
		
	}

	$scope.freeSay3 = function() {
		if(!$scope.isStart_1) {
			return;
		}
		if($scope.oneTime1 == 0) {
			return;
		}
		
		$scope.oneTime1--;
		$timeout($scope.freeSay3, 1000,true);
	}

	$scope.isStart_2 = false;
	$scope.oneTimeChange2 = function() {
		$scope.isStart_2 = !$scope.isStart_2;
		if($scope.isStart_2) {
			$scope.freeSay4();
		}else return;
		
	}

	$scope.freeSay4 = function() {
		if(!$scope.isStart_2) {
			return;
		}
		if($scope.oneTime2 == 0) {
			return;
		}
		
		$scope.oneTime2--;
		$timeout($scope.freeSay4, 1000,true);
	}

	$scope.isStart_3 = false;
	$scope.oneTimeChange3 = function() {
		$scope.isStart_3 = !$scope.isStart_3;
		if($scope.isStart_3) {
			$scope.freeSay5();
		}else return;
		
	}

	$scope.freeSay5 = function() {
		if(!$scope.isStart_3) {
			return;
		}
		if($scope.oneTime3 == 0) {
			return;
		}
		
		$scope.oneTime3--;
		$timeout($scope.freeSay5, 1000,true);
	}

	$scope.isStart_4 = false;
	$scope.oneTimeChange4 = function() {
		$scope.isStart_4 = !$scope.isStart_4;
		if($scope.isStart_4) {
			$scope.freeSay6();
		}else return;
		
	}

	$scope.freeSay6 = function() {
		if(!$scope.isStart_4) {
			return;
		}
		if($scope.oneTime4 == 0) {
			return;
		}
		
		$scope.oneTime4--;
		$timeout($scope.freeSay6, 1000,true);
	}

	$scope.fifteen = 15;

	$scope.isStart_50 = false;
	$scope.oneTimeChange50 = function() {
		$scope.isStart_50 = !$scope.isStart_50;
		if($scope.isStart_50) {
			$scope.freeSay7();
		}else return;
		
	}

	$scope.freeSay7 = function() {
		if(!$scope.isStart_50) {
			return;
		}
		if($scope.fifteen == 0) {
			return;
		}
		
		$scope.fifteen--;
		$timeout($scope.freeSay7, 1000,true);
	}

	$scope.repeatTime =function() {
		$scope.fifteen = 15;
	}

	$scope.isStart_5 = false;
	$scope.oneTimeChange5 = function() {
		$scope.isStart_5 = !$scope.isStart_5;
		if($scope.isStart_5) {
			$scope.freeSay1();
		}else return;
		
	}

	$scope.freeSay1 = function() {
		if(!$scope.isStart_5) {
			return;
		}
		if($scope.oneTime5 == 0) {
			return;
		}
		
		$scope.oneTime5--;
		$timeout($scope.freeSay1, 1000,true);
	}
	
	$scope.isStart_6 = false;
	$scope.oneTimeChange6 = function() {
		$scope.isStart_6 = !$scope.isStart_6;
		if($scope.isStart_6) {
			$scope.freeSay2();
		}else return;
		
	}

	$scope.freeSay2 = function() {
		if(!$scope.isStart_6) {
			return;
		}
		if($scope.oneTime6 == 0) {
			return;
		}
		
		$scope.oneTime6--;
		$timeout($scope.freeSay2, 1000,true);
	}

	$scope.ddd = 180;

	$scope.repeatTime1 =function() {
		$scope.ddd = 180;
	}

	/*$scope.fifteenTime1 = function() {
		if($scope.ddd == 0) return;
		$scope.ddd--;
		$timeout($scope.fifteenTime1, 1000,true);
	}*/

	$scope.isStart_60 = false;
	$scope.fifteenTime1 = function() {
		$scope.isStart_60 = !$scope.isStart_60;
		if($scope.isStart_60) {
			$scope.freeSay20();
		}else return;
		
	}

	$scope.freeSay20 = function() {
		if(!$scope.isStart_60) {
			return;
		}
		if($scope.ddd == 0) {
			return;
		}
		
		$scope.ddd--;
		$timeout($scope.freeSay20, 1000,true);
	}

}]);