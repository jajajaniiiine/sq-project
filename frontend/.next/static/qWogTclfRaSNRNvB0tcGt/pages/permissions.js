(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{22:function(e,t,n){"use strict";var r=n(8),o=n.n(r),a=n(0),i=n.n(a),u=n(4),c=n(7),l=n.n(c),s=n(14),f=n(10),p=n(9),m=n(13),d=n.n(m);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=w(e);if(t){var o=w(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;return g(e)}(this,n)}}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  mutation SIGNIN_MUTATION($email: String!, $password: String!) {\n    signin(email: $email, password: $password) {\n      id\n      email\n      name\n    }\n  }\n"]);return O=function(){return e},e}var P=l()(O()),j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(l,a["Component"]);var t,n,r,c=E(l);function l(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return S(g(e=c.call.apply(c,[this].concat(n))),"state",{name:"",email:"",password:""}),S(g(e),"saveToState",function(t){e.setState(S({},t.target.name,t.target.value))}),e}return t=l,(n=[{key:"render",value:function(){var e=this;return i.a.createElement(u.Mutation,{mutation:P,variables:this.state,refetchQueries:[{query:p.a}]},function(t,n){var r=n.error,a=n.loading;return i.a.createElement(s.a,{method:"post",onSubmit:function(){var n,r=(n=o.a.mark(function n(r){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.next=3,t();case 3:e.setState({name:"",email:"",password:""}),d.a.push({pathname:"/"});case 5:case"end":return n.stop()}},n)}),function(){var e=this,t=arguments;return new Promise(function(r,o){var a=n.apply(e,t);function i(e){b(a,r,o,i,u,"next",e)}function u(e){b(a,r,o,i,u,"throw",e)}i(void 0)})});return function(e){return r.apply(this,arguments)}}()},i.a.createElement("fieldset",{disabled:a,"aria-busy":a},i.a.createElement("h2",null,"Sign Into Your Account"),i.a.createElement(f.a,{error:r}),i.a.createElement("label",{htmlFor:"email"},"Email",i.a.createElement("input",{type:"email",name:"email",placeholder:"Email",value:e.state.email,onChange:e.saveToState,required:!0})),i.a.createElement("label",{htmlFor:"password"},"Password",i.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:e.state.password,onChange:e.saveToState,required:!0})),i.a.createElement("button",{type:"submit"}," Sign In")))})}}])&&h(t.prototype,n),r&&h(t,r),l}();t.a=j},26:function(e,t,n){"use strict";var r=n(6).b.button.withConfig({displayName:"SickButton",componentId:"l04z44-0"})(["background:red;color:white;font-weight:500;border:0;border-radius:0;text-transform:uppercase;font-size:2rem;padding:0.8rem 1.5rem;transform:skew(-2deg);display:inline-block;transition:all 0.5s;&[disabled]{opacity:0.5;}"]);t.a=r},27:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(4),i=n(9),u=n(22);t.a=function(e){return o.a.createElement(a.Query,{query:i.a},function(t){var n=t.data;return t.loading?o.a.createElement("p",null,"Loading..."):n.me?e.children:o.a.createElement("div",null,o.a.createElement("p",null,"Please Sign In Into Your Account"),o.a.createElement(u.a,null))})}},302:function(e,t,n){__NEXT_REGISTER_PAGE("/permissions",function(){return e.exports=n(320),{page:e.exports.default}})},320:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(27),i=n(4),u=n(10),c=n(7),l=n.n(c),s=n(70),f=n(26);n(2);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=E(e);if(t){var o=E(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;return v(e)}(this,n)}}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(){var e=O(["\n  query {\n    users {\n      id\n      name\n      email\n      permissions\n    }\n  }\n"]);return w=function(){return e},e}function S(){var e=O(["\n  mutation updatePermissions($permissions: [Permission], $userId: ID!) {\n    updatePermissions(permissions: $permissions, userId: $userId) {\n      id\n      permissions\n      name\n      email\n    }\n  }\n"]);return S=function(){return e},e}function O(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var P=["ADMIN","USER","ITEMCREATE","ITEMUPDATE","ITEMDELETE","PERMISSIONUPDATE"],j=l()(S()),I=l()(w()),k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(c,o.a.Component);var t,n,r,a=h(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return g(v(e=a.call.apply(a,[this].concat(n))),"state",{permissions:e.props.user.permissions}),g(v(e),"handlePermissionChange",function(t){var n=t.target,r=m(e.state.permissions);n.checked?r.push(n.value):r=r.filter(function(e){return e!==n.value}),e.setState({permissions:r})}),e}return t=c,(n=[{key:"render",value:function(){var e=this,t=this.props.user;return o.a.createElement(i.Mutation,{mutation:j,variables:{permissions:this.state.permissions,userId:this.props.user.id}},function(n,r){var a=r.loading,i=r.error;return o.a.createElement(o.a.Fragment,null,i&&o.a.createElement("tr",null,o.a.createElement(u.a,{error:i})),o.a.createElement("tr",null,o.a.createElement("td",null,t.name),o.a.createElement("td",null,t.email),P.map(function(n){return o.a.createElement("td",{key:n},o.a.createElement("label",{htmlFor:"".concat(t.id,"-permission-").concat(n)},o.a.createElement("input",{id:"".concat(t.id,"-permission-").concat(n),type:"checkbox",checked:e.state.permissions.includes(n),value:n,onChange:e.handlePermissionChange})))}),o.a.createElement("td",null,o.a.createElement(f.a,{type:"button",disabled:a,onClick:n},"Updat",a?"ing":"e")),o.a.createElement("td",null,o.a.createElement(f.a,{type:"button",disabled:a,onClick:function(){confirm("Are you sure you want to delete this User's Account? ")&&deleteItem().catch(function(e){alert(e.message)})}},"Delet",a?"ing":"e"))))})}}])&&y(t.prototype,n),r&&y(t,r),c}(),_=function(e){return o.a.createElement(i.Query,{query:I},function(e){var t=e.data,n=(e.loading,e.error);return o.a.createElement("div",null,o.a.createElement(u.a,{error:n}),console.log(n),o.a.createElement("div",null,o.a.createElement("h2",null,"Manage Permissions"),o.a.createElement(s.a,null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Email"),P.map(function(e){return o.a.createElement("th",{key:e},e)}),o.a.createElement("th",null,"Action"))),o.a.createElement("tbody",null,t.users.map(function(e){return o.a.createElement(k,{user:e,key:e.id})})))))})};t.default=function(e){return o.a.createElement("div",null,o.a.createElement(a.a,null,o.a.createElement(_,null)))}},70:function(e,t,n){"use strict";var r=n(6).b.table.withConfig({displayName:"Table",componentId:"sc-1jvbtk5-0"})(["border-spacing:0;width:100%;border:1px solid ",";thead{font-size:10px;}td,th{border-bottom:1px solid ",";border-right:1px solid ",";padding:5px;position:relative;&:last-child{border-right:none;width:150px;button{width:100%;}}label{padding:10px 5px;display:block;}}tr{&:hover{background:",";}}"],function(e){return e.theme.offWhite},function(e){return e.theme.offWhite},function(e){return e.theme.offWhite},function(e){return e.theme.offWhite});t.a=r}},[[302,1,0]]]);