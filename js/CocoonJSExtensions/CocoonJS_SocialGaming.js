(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    if (!CocoonJS.Social)
		throw("The CocoonJS.Social object must exist and be valid before creating any extension object.");

	/**
	* This type represents the access to a native Social Gamming extension API. As there can be more than
	* one service of this type, more than one instance can be created.
	* @namespace
	* @constructor
	* @param {string} nativeExtensionName The name of the native ext object extension property name.
	* @param {string} extensionName The name of the CocoonJS object extension property name.
	*/
	CocoonJS.SocialGaming = function(nativeExtensionName, extensionName)
	{
		CocoonJS.SocialGaming.superclass.constructor.call(this, nativeExtensionName, extensionName);

		/**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user and friends scores request succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserAndFriendsScoresSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {array} userAndFriendsScoreInfos An array of {@link CocoonJS.SocialGaming.UserScoreInfo} objects representing the information of the user's and friends' scores.
	    */
		this.onRequestUserAndFriendsScoresSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserAndFriendsScoresSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user and his/her friends scores request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserAndFriendsScoresFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the score and friends scores were requested.
	    * @param {string} leadeboardID The id of the leaderboard for whom the score and friends scores were requested.
	    * @param {string} errorMessage The error message.
	    */
		this.onRequestUserAndFriendsScoresFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserAndFriendsScoresFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's score information request suceeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserScoreSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {CocoonJS.SocialGaming.UserScoreInfo} userScoreInfo The info of the user's score.
	    */
		this.onRequestUserScoreSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserScoreSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's score information request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserScoreFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the score was requested.
	    * @param {string} leaderboardID The id of the leaderboard for whom the score was requested.
	    * @param {string} errorMessage The error message.
	    */
		this.onRequestUserScoreFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserScoreFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's score submit suceeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnSubmitUserScoreSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the score has been submitted.
	    * @param {string} leaderboardID The id of the leaderboard for which the score has been submitted.
	    * @param {number} score The score that has been submitted.
	    */
		this.onSubmitUserScoreSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onSubmitUserScoreSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's score submit fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnSubmitUserScoreFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the score submition was requested.
	    * @param {string} leaderboadID The id of the leaderboard for which the score submition was requested.
	    * @param {number} score The score that was submitted and failed.
	    * @param {string} errorMessage The error message.
	    */
		this.onSubmitUserScoreFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onSubmitUserScoreFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's achievements info are successfully retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserAchievementsSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievements where requested.
	    * @param {array} achievementsInfos An array of {@link CocoonJS.SocialGaming.AchievementInfo} objects representing the information of the user's achievements.
	    */
		this.onRequestUserAchievementsSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserAchievementsSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's achievmeents info fails to be retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestUserAchievementsFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievements were requested.
	   	* @param {string} msg The error message.
	    */
		this.onRequestUserAchievementsFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserAchievementsFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's achievements info are successfully retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestAllAchievementsSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {array} achievementsInfos An array of {@link CocoonJS.SocialGaming.AchievementInfo} objects representing the information of all the achievements.
	    */
		this.onRequestAllAchievementsSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestAllAchievementsSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's achievmeents info fails to be retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestAllAchievementsFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	   	* @param {string} msg The error message.
	    */
		this.onRequestAllAchievementsFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestAllAchievementsFailed");

		/**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the request to retrieve the information of an achievement succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestAchievementInfoSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {CocoonJS.SocialGaming.AchievementInfo} achievementInfo A {@link CocoonJS.SocialGaming.AchievementInfo} object representing the information of the achievements.
	    */
		this.onRequestAchievementInfoSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestAchievementInfoSucceed");

		/**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the request to retrieve the information of an achievement fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnRequestAchievementInfoFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} achievementID The id of the achievement for which the information retrieval was requested.
	    * @param {string} errorMessage The error message.
	    */
		this.onRequestAchievementInfoFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestAchievementInfoFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement submition succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnSubmitUserAchievementSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievement has been submitted.
	    * @param {string} achievementID The id of the achievement that has been submitted.
	    */
		this.onSubmitUserAchievementSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onSubmitUserAchievementSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement submition fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnSubmitUserAchievementFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievment was submitted.
	    * @param {string} achievementID The id of the achievement that was submitted.
	    * @param {string} msg The error message.
	    */
		this.onSubmitUserAchievementFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onSubmitUserAchievementFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement reset succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnResetUserAchievementsSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievements were reset.
	    */
		this.onResetUserAchievementsSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onResetUserAchievementsSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement reset fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnResetUserAchievementsFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} userID The id of the user for whom the achievements where tried to be reset.
	    * @param {string} msg The error message.
	    */
		this.onResetUserAchievementsFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onResetUserAchievementsFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the users closes the achievements view.
	    * The callback function does not receive any parameter.
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    */
		this.onAchievementsViewClosed  = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onAchievementsViewClosed");

		/**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the achievements view failed to show.
	    * The callback function does not receive any parameter.
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    */
		this.onAchievementsViewFailed  = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onAchievementsViewFailed");

		/**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when achievements view shows successfully.
	    * The callback function does not receive any parameter.
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    */
		this.onAchievementsViewSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onAchievementsViewSucceed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement reset fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnLeaderboardViewClosedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} leaderboardID The id of the leaderboard for which it's vew was requested to be shown.
	    */
   		this.onLeaderboardViewClosed  = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLeaderboardViewClosed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement reset fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnLeaderboardViewFailedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} leaderboardID The id of the leaderboard for which it's vew was requested to be shown.
	    * @param {string} errorMessage The error message.
	    */
   		this.onLeaderboardViewFailed  = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLeaderboardViewFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when a user's achievement reset fails.
	    * The callback function's documentation is represented by {@link CocoonJS.SocialGaming.OnLeaderboardViewSucceedListener}
	    * @event
	    * @static
	    * @memberOf CocoonJS.SocialGaming
	    * @param {string} leaderboardID The id of the leaderboard for which it's vew was requested to be shown.
	    */
   		this.onLeaderboardViewSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLeaderboardViewSucceed");

		return this;
	};

	CocoonJS.SocialGaming.prototype = 
	{
        abstractToSocialGamingAchievementMap : null,
        abstractToSocialGamingAchievementMapInverse : null,

        /**
        * @ignore
        */
        setAbstractToSocialGamingAchievementMap : function( map ) {
            this.abstractToSocialGamingAchievementMap= map;

            // build a reciprocal map.
            this.abstractToSocialGamingAchievementMapInverse= {};
            for( var id in map ) {
                if ( map.hasOwnProperty(id) ) {
                    this.abstractToSocialGamingAchievementMapInverse[ map[id] ]= id;
                }
            }
            return this;
        },

        /**
        * @ignore
        */
        getAbstractToSocialGamingAchievementTranslation : function( achievementID ) {
            /**
             * If a translation map for abstract in-game achievements has been set, translate achievementID from
             * abstract to SocialGamingService.
             */
            if (this.abstractToSocialGamingAchievementMap) {
                var socialGamingAchievementID = this.abstractToSocialGamingAchievementMap[achievementID];
                if (socialGamingAchievementID) {
                    console.log("Abstract achieventID='" + achievementID + "' turned to '" + socialGamingAchievementID + "'");
                    achievementID = socialGamingAchievementID;
                } else {
                    console.log("Something may be wrong: abstract achievementID: '" + achievementID + "' w/o translation.")
                }
            }

            return achievementID;
        },

		/**
		* Request to retrieve the scores of all friends of a given user.
		* @param {string} [leaderboardID] The id of the leaderboard to request the scores for.
		* @param {string} [userID] The id of the user. If null or undefined is passed, the currently logged in user id is used.
		* @see CocoonJS.SocialGaming.onRequestUserAndFriendsScoresSucceed
		* @see CocoonJS.SocialGaming.onRequestUserAndFriendsScoresFailed
		*/
		requestUserAndFriendsScores : function(leaderboardID, userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserAndFriendsScores", arguments);
			}
		},

		/**
		* Request to retrieve the score of a user.
		* @param {string} [leaderboardID] The id of the scores leaderboard to retireve the score from. If null or underfined is passed, the "leadeboard" id will be used.
		* @param {string} [userID] The id of the user to retireve the score from. If null or undefined is passed, the currently logged in user id is used.
		* @see CocoonJS.SocialGaming.onRequestUserScoreSucceed
		* @see CocoonJS.SocualGaming.onRequestUserScoreFailed
		*/
		requestUserScore : function(leaderboardID, userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserScore", arguments);
			}
		},

		/**
		* Request to the server the score of a user.
		* @param {number} [score] the score to submit
		* @param {string} [leaderboardID] The id of the scores leaderboard to submit the score to. If null or underfined is passed, the "leadeboard" id will be used.
		* @param {string} [userID] The id of the user to submit the score for. If null or undefined is passed, the currently logged in user id is used.
		* @see CocoonJS.SocialGaming.onSubmitUserScoreSucceed
		* @see CocoonJS.SocualGaming.onSubmitUserScoreFailed
		*/
		submitUserScore : function(score, leaderboardID, userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "submitUserScore", arguments);
			}
		},
		/**
		* Shows the leaderboard using a platform dependant view.
		* @para {string} [leaderboardID] The id of the scores leaderboard to show the view for. If null or underfined is passed, the "leadeboard" id will be used.
		* @see CocoonJS.SocialGaming.onLeaderboardViewClosed
		*/
		showLeaderboardView : function(leaderboardID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "showLeaderboardView", arguments);
			}
		},

		/**
		* Request to retrieve the user achievements. The request can be monitored using the {@link CocoonJS.SocialGaming.onRequestUserAchievementsSucceed} and {@link CocoonJS.Social.onRequestUserAchievementsFailed} event handlers.
		* @param {string} [userID] The id of the user to retireve the achievements from. if null/undefined/"" is specified, the currently logged in user is assumed.
		* @see CocoonJS.SocialGaming.onRequestUserAchievementsSucceed
		* @see CocoonJS.SocialGaming.onRequestUserAchievementsFailed
		*/
		requestUserAchievements : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserAchievements", arguments);
			}
		},

		/**
		* Request to retrieve all the achievements. The request can be monitored using the {@link CocoonJS.SocialGaming.onRequestAllAchievementsSucceed} and {@link CocoonJS.Social.onRequestAllAchievementsFailed} event handlers.
		* @see CocoonJS.SocialGaming.onRequestAllAchievementsSucceed
		* @see CocoonJS.SocialGaming.onRequestAllAchievementsFailed
		*/
		requestAllAchievements : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestAllAchievements", arguments);
			}
		},

		/**
		* Request to retrieve the information about an achievement. 
		* @param {string} achievementID The id of the achievement to get the information for.
		* @param {CocoonJS.Social.ImageSizeType} [imageSizeType] The size of the image. One of the possible values among the ones in the {@link CocoonJS.Social.ImageSizeType}
		*/
		requestAchievementInfo : function(achievementID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestAchievementInfo", arguments);
			}
		},

		/**
		* Submits an achievement to the server. If the process fails, the achievement is stored to submit it later.
		* @param {string} [achievementID] the achievement identifier
		* @param {number} [percentComplete] an optional number between 0 and 100 that indicates a completion percentage.
		* @see CocoonJS.SocialGaming.onSubmitAchievementSucceed
		* @see CocoonJS.SocualGaming.onSubmitAchievementFailed
		*/
        submitUserAchievement:function (achievementID, userID) {
            achievementID = this.getAbstractToSocialGamingAchievementTranslation(achievementID);

            if (this.nativeExtensionObjectAvailable) {
                return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "submitUserAchievement", arguments);
            }
        },

		/**
		* Shows the achievements using a platform dependant view.
		* @see CocoonJS.SocialGaming.onAchievementsViewClosed
		*/
		showUserAchievementsView : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "showUserAchievementsView", arguments);
			}
		},

		/**
		* Resets all the achievements of the current user
		* @param {string} [userID] The id of the user to reset the achievements for. If null/undefined/"", the logged in user is assumed.
		* @see CocoonJS.SocialGaming.onResetAchievementsSucceed
		* @see CocoonJS.SocualGaming.onResetAchievementsFailed
		*/
		resetUserAchievements : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "resetUserAchievements", arguments);
			}
		}
	};

	/**
    * @ignore
    */
	CocoonJS.extend(CocoonJS.SocialGaming, CocoonJS.Social);

	/**
	* The data structure that represents the information of the user score in the application.
	* @namespace
	* @constructor
	* @param {string} userID The user id.
	* @param {number} score The score of the user.
	* @param {string} userName The name of the user.
	* @param {string} imageURL The url of the user image.
	* @param {number} leaderboardID The id of the leaderboard the score belongs to.
	*/
	CocoonJS.SocialGaming.UserScoreInfo = function(userID, score, userName, imageURL, leaderboardID)
	{
		/**
		* The user id. 
		* @type string
		*/
		this.userID = userID;

		/**
		* The score of the user.
		* @type number
		*/
		this.score = score ? score : 0;

		/**
		* The name of the user.
		* @type string
		*/
        this.userName = userName;

		/**
		* The url of the user image.
		* @type string
		*/
        this.imageURL = imageURL;

        /**
		* The id of the leaderboard the score belongs to.
		* @type number
		*/
        this.leaderboardID = leaderboardID;
	};

	/**
	* The data structure that represents the information of an achievement in the application.
	* @namespace
	* @constructor
	* @param {string} achievementID The id of the achievement info.
	* @param {string} title The title of the achievement.
	* @param {string} description The description of the achievement.
	* @param {string} imageURL The url to the image representing the achievement.
	* @param {number} points The points value of the achievement
	*/
	CocoonJS.SocialGaming.AchievementInfo = function(achievementID, title, description, imageURL, points)
	{
		/**
		* The id of the achievement info.
		* @type string
		*/
		this.achievementID = achievementID;

		/**
		* The title of the achievement.
		* @type string
		*/
		this.title = title;

		/**
		* The description of the achievement.
		* @type string
		*/
		this.description = description;

		/**
		* The url to the image representing the achievement.
		* @type string
		*/
		this.imageURL = imageURL;

		/**
		* The points value of the achievement
		* @type number
		*/
		this.points = points ? points : 0;
	};

})();