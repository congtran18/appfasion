/* Fetched from web server... */
import Category from '../models/category';
/* import Product from '../models/product';*/
export const CATEGORIES = [
  new Category('c1', 'T-shirt', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/tshirt.jpg?alt=media&token=7c9adc49-c7f5-462e-86e7-53a0f05e20d4'),
  new Category('c2', 'jeans', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/jeans.jpg?alt=media&token=f93548f2-f588-48cd-b171-de65c3e3ca4c'),
  new Category('c3', 'Kaki pant', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/kakipant.jpg?alt=media&token=f13a061c-7b70-45d9-95c8-23810f311935'),
  new Category('c4', 'short pant', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/shortpant.jpg?alt=media&token=7ae8e6bb-945d-4c05-81a4-9adebe896fa7'),
  new Category('c5', 'jacket', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/jacket.jpg?alt=media&token=53c133bb-3ca7-48cf-99a7-b348eb815ab3'),
  new Category('c6', 'vest', 'https://firebasestorage.googleapis.com/v0/b/appfasion.appspot.com/o/vest.jpg?alt=media&token=ecf41191-cbb1-47e8-a634-d87e95f00d6c'),
];

/*
const PRODUCTS = [
    new Product(
        'p1',
        'u1',
        'Red Shirt',
        'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
        'A red t-shirt, perfect for days with non-red weather.',
        29.99
    ),
    new Product(
        'p2',
        'u1',
        'Blue Carpet',
        'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'Fits your red shirt perfectly. To stand on. Not to wear it.',
        99.99
    ),
    new Product(
        'p3',
        'u2',
        'Coffee Mug',
        'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
        'Can also be used for tea!',
        8.99
    ),
    new Product(
        'p4',
        'u3',
        'The Book',
        'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
        "What the content is? Why would that matter? It's a limited edition!",
        15.99
    ),
    new Product(
        'p5',
        'u3',
        'PowerBook',
        'https://www.notebookcheck-cn.com/uploads/tx_nbc2/air13teaser.jpg',
        'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
        2299.99
    ),
    new Product(
        'p6',
        'u1',
        'Pen & Paper',
        'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
        "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
        5.49
    )
];

export default PRODUCTS;
 */