module.exports = function (api) {

  api.onCreateNode( options => {
    
    
    // If tags aren't an array split them by ','
    if (options.internal.typeName === 'Item') {
      options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
    }
    
    if (options.internal.typeName === 'Tag') {
      // To allow showing variant tags on the tag's page
      if (!options.id.startsWith('variant')) {
        options.variantTag = `variant:${options.id}`;
      }
    }
    
    return {...options};
  })


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
    
    // For every item
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
