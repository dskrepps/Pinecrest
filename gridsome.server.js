module.exports = function (api) {

// The following no longer necessary since using an array works better for Netlify CMS
// If tags aren't an array split them by ','
  // api.onCreateNode( options => {
  //   if (options.internal.typeName === 'Item') {
  //     options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
  //     return {...options};
  //   }
  // })


  api.createPages( async ({graphql, createPage}) => {
    const {data} = await graphql(`{
      allItem {
        edges {
          node {
            id
            path
            tags {
              title
            }
          }
        }
      }
    }
    `);
    
    data.allItem.edges.forEach(function(element) {
      
      // Allow querying posts by their name appearing in tags after 'variant-of:'
      let variantTags = element.node.tags
        .filter( tag=>tag.title.startsWith('variant-of:') )
        .map( tag=>tag.title );
        
      createPage({
        path: element.node.path,
        component: './src/templates/SingleItem.vue',
        context: {
          variantTags,
          id: element.node.id,
        }
      });

    });

  });

}
