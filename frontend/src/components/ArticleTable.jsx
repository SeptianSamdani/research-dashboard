export default function ArticleTable({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Publications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Journal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((article, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{article.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.publication_year}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.journal_title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}