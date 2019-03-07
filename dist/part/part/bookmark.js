FrontPlaster.prototype.bookmark = function () {
  /*
  How to use : 
  
  var bookmarkManager = new BookmarkManager();
  bookmarkManager.enableBookmarks(true);
  
  */
  var that = this;
  this.request = null;
  this.devController = window.location.href.indexOf('/app_dev.php') > -1 ? '/app_dev.php' : '';
  this.active_class = params && params.hasOwnProperty('active_class') ? params.active_class : "glyphicon-heart";
  this.passive_class = params && params.hasOwnProperty('passive_class') ? params.passive_class : "glyphicon-heart-empty";
  this.toggle_action_click = toggle_action_click;
  this.toggle_action_hover = toggle_action_hover;
  this.toggle_request = toggle_request;
  this.find_one_request = find_one_request;
  this.find_all_url = params && params.hasOwnProperty('find_all_url') ? params.find_all_url : this.devController + '/favoris/findAll';
  this.toggle_request_url = params && params.hasOwnProperty('toggle_request_url') ? params.toggle_request_url : this.devController + '/favoris/toggleOne';
  this.find_one_url = params && params.hasOwnProperty('find_one_url') ? params.find_one_url : this.devController + '/favoris/find_one_url';
  this.bookmarks = {}; //Default URL for single bookmark page

  this.default_url = window.location.href;

  this.cleanUrl = function (url) {
    //Avoid anchors in the link ("http://element#top" == "http://element")
    if (url.indexOf("#") > -1) {
      url = url.substring(0, url.indexOf("#"));
    }

    return url;
  };

  this.enableBookmarks = function (check_in_db) {
    let unclassedBookmarks = document.querySelectorAll('[data-bookmark-id]');
    let bookmarks_json = {};

    for (let i = 0; i < unclassedBookmarks.length; ++i) {
      let unclassedBookmark = unclassedBookmarks[i];
      let bookmarkID = unclassedBookmark.getAttribute("data-bookmark-id");
      let bookmarkType = unclassedBookmark.getAttribute("data-bookmark-type");

      if (!this.bookmarks[bookmarkID]) {
        this.bookmarks[bookmarkID] = {};
        this.bookmarks[bookmarkID][bookmarkType] = unclassedBookmark;
      } else {
        this.bookmarks[bookmarkID][bookmarkType] = unclassedBookmark;
      }
    } //that is using here to avoid the context error in CB


    for (let bookmark in that.bookmarks) {
      let title = that.bookmarks[bookmark].title.innerText;
      let url = that.bookmarks[bookmark].url ? that.bookmarks[bookmark].url.href : that.default_url;
      let image_url = that.bookmarks[bookmark].image ? that.bookmarks[bookmark].image.src : "";
      $(that.bookmarks[bookmark].button).hover(function (event) {
        that.toggle($(this), event, title, url, image_url);
      });
      $(that.bookmarks[bookmark].button).on('click', function (event) {
        that.toggle($(this), event, title, url, image_url);
        event.stopPropagation();
      });
      bookmarks_json[bookmark] = this.cleanUrl(url);
    }

    if (check_in_db) {
      that.findAll(bookmarks_json);
    }
  };

  this.findOne = function (url, element) {
    url = this.cleanUrl(url);
    this.request = this.find_one_request ? this.find_one_request(url) : this.defaultFindOneRequest(url);
    $.ajax({
      type: 'GET',
      url: this.request,
      success: function () {
        element.removeClass(that.passive_class).addClass(that.active_class);
      }
    });
  };

  this.defaultFindOneRequest = function (url) {
    return that.find_one_url + "?url=" + encodeURIComponent(url);
  };

  this.findAll = function (bookmarks) {
    $.ajax({
      type: 'POST',
      url: that.find_all_url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(bookmarks),
      success: function (data) {
        for (let id in data) {
          if (data[id] === "200") {
            $(that.bookmarks[id].button).removeClass(that.passive_class).addClass(that.active_class);
          }
        }
      }
    });
  };

  this.toggle = function (element, event, title, url, image_url) {
    if (event.type === "click") {
      this.toggle_action_click ? this.toggle_action_click(element, event) : this.defaultToggleActionClick(element, event);
      url = this.cleanUrl(url);
      this.request = this.toggle_request ? this.toggle_request(title, url, image_url) : this.defaultToggleRequest(title, url, image_url);
      $.ajax({
        type: 'GET',
        url: this.request
      });
    } else {
      this.toggle_action_hover ? this.toggle_action_hover(element, event) : this.defaultToggleActionHover(element, event);
    }
  };

  this.defaultToggleActionClick = function (element, event) {
    element.toggleClass(this.passive_class).toggleClass(this.active_class);
  };

  this.defaultToggleActionHover = function (element, event) {
    element.toggleClass(this.passive_class).toggleClass(this.active_class);
  };

  this.defaultToggleRequest = function (title, url, image_url) {
    return that.toggle_request_url + "?title=" + title + "&url=" + encodeURIComponent(url) + "&image_url=" + encodeURIComponent(image_url);
  };

  this.reset = function () {
    for (let bookmark in that.bookmarks) {
      $(that.bookmarks[bookmark].button).off();
    }

    this.enableBookmarks(true);
  };
};