# First, make sure we're in the project directory
cd C:\Users\reesh\Commerce\my-bakery

# Rename components
Rename-Item ".\src\components\Cart.js" "Cart.jsx"
Rename-Item ".\src\components\Home.js" "Home.jsx"
Rename-Item ".\src\components\Login.js" "Login.jsx"
Rename-Item ".\src\components\Navigation.js" "Navigation.jsx"
Rename-Item ".\src\components\ProductDetail.js" "ProductDetail.jsx"
Rename-Item ".\src\components\ProtectedRoute.js" "ProtectedRoute.jsx"
Rename-Item ".\src\components\Search.js" "Search.jsx"
Rename-Item ".\src\components\Signup.js" "Signup.jsx"
Rename-Item ".\src\components\Wishlist.js" "Wishlist.jsx"
Rename-Item ".\src\components\FeedbackForm.js" "FeedbackForm.jsx"
Rename-Item ".\src\components\MetaTags.js" "MetaTags.jsx"

# Rename admin components
Rename-Item ".\src\components\Admin\AdminDashboard.js" "AdminDashboard.jsx"
Rename-Item ".\src\components\Admin\ProductManagement.js" "ProductManagement.jsx"
Rename-Item ".\src\components\Admin\OrderManagement.js" "OrderManagement.jsx"
Rename-Item ".\src\components\Admin\OrderDetails.js" "OrderDetails.jsx"

# Rename contexts
Rename-Item ".\src\contexts\AuthContext.js" "AuthContext.jsx"
Rename-Item ".\src\contexts\CartContext.js" "CartContext.jsx"
Rename-Item ".\src\contexts\WishlistContext.js" "WishlistContext.jsx"

# Rename utils
Rename-Item ".\src\utils\adminAuth.js" "adminAuth.jsx"

# Rename root app file
Rename-Item ".\src\App.js" "App.jsx"

# Rename App.js to App.jsx
Move-Item -Path ".\src\App.js" -Destination ".\src\App.jsx" -Force

# Update all import references from .js to .jsx
((Get-Content -Path ".\src\main.jsx" -Raw) -replace '\.js', '.jsx') | Set-Content -Path ".\src\main.jsx"
