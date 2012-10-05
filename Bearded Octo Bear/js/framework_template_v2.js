/* ==========================================================
 * Lynda Overlay Plugin
 * ==========================================================
 * Copyright 1995–2012 lynda.com, Inc. All rights reserved.
 *
 * ---------Options:-----------------------------------------
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 * ---------Useage: (with options)---------------------------
 
 
 
 * ---------License------------------------------------------
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function($){
    $.fn.extend({
        overlay: function(options) {
            var defaults = {
                start: true
            };
            options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                
                if(o.start){

                }
            });
        }
    });
    $(document).ready(function () {
        $("body").overlay({start: true});
    });
})(jQuery);