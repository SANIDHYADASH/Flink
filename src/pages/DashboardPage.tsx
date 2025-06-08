import React, { useState, useRef, useEffect } from 'react';
import { FileText, Upload, Edit2 } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';
import ShareFileForm from '../components/Dashboard/ShareFileForm';
import ShareTextForm from '../components/Dashboard/ShareTextForm';

const DashboardPage: React.FC = () => {
	const { user } = useAuth();
	const { userShares, deleteShare, refreshShares } = useShare();
	const [tab, setTab] = useState<'files' | 'texts'>('files');
	const [search, setSearch] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [editShare, setEditShare] = useState<any>(null);
	const [addType, setAddType] = useState<'file' | 'text' | null>(null);
	const [detailShare, setDetailShare] = useState<any>(null);
	
	const modalRef = useRef<HTMLDivElement>(null);
	const detailModalRef = useRef<HTMLDivElement>(null);

	// Refresh shares on mount
	useEffect(() => {
		refreshShares();
	}, []);

	// Handle click outside modal to close
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setShowAddModal(false);
				setEditShare(null);
				setAddType(null);
			}
		};

		if (showAddModal) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showAddModal]);

	// Handle click outside detail modal to close
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (detailModalRef.current && !detailModalRef.current.contains(event.target as Node)) {
				setDetailShare(null);
			}
		};

		if (detailShare) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [detailShare]);

	// Filtered shares based on tab and search
	const filteredShares = userShares
		.filter((share) => (tab === 'files' ? share.type === 'file' : share.type === 'text'))
		.filter((share) =>
			search.trim()
				? (share.title?.toLowerCase().includes(search.toLowerCase()) ||
					share.name?.toLowerCase().includes(search.toLowerCase()) ||
					(share.type === 'text' && share.content?.toLowerCase().includes(search.toLowerCase())))
				: true
		);

	// Handle delete
	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this share?')) {
			try {
				await deleteShare(id);
			} catch (error) {
				console.error('Failed to delete share:', error);
				alert('Failed to delete share. Please try again.');
			}
		}
	};

	const formatDate = (date?: string) => {
		if (!date) return '';
		const d = new Date(date);
		return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
	};

	// Expiry label logic
	const getExpiryLabel = (share: any) => {
		// Prefer expiresAt if present, else expiry
		const expiryValue = share.expiresAt || share.expiry;
		if (expiryValue === 'never' || !expiryValue) {
			return <span className="text-green-600 font-semibold">Never</span>;
		}
		const expiryDate = new Date(expiryValue);
		if (!isNaN(expiryDate.getTime())) {
			return formatDate(expiryValue);
		}
		return <span className="text-green-600 font-semibold">Never</span>;
	};

	const getUserName = () => {
		if (user?.user_metadata?.name) {
			return user.user_metadata.name;
		}
		if (user?.email) {
			return user.email.split('@')[0];
		}
		return 'User';
	};

	return (
		<div className="min-h-screen bg-[#f8fafd] flex flex-col">
			{/* Top bar */}
			<header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-white shadow-sm gap-4 sm:gap-0">
				<div className="w-full sm:w-auto text-left font-semibold text-gray-700 text-base">
					Hi, <span className="text-primary-600">{getUserName()}</span>
				</div>
				<div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-end">
					<input
						type="text"
						placeholder="Search files or texts..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 w-full sm:w-64"
					/>
					<button
						className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm shadow transition w-auto"
						onClick={() => { setShowAddModal(true); setEditShare(null); setAddType(null); }}
					>
						+ ADD NEW
					</button>
				</div>
			</header>

			{/* Main section */}
			<main className="flex-1 px-2 sm:px-4 md:px-12 py-6 sm:py-10 bg-[#f8fafd]">
				<h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 mt-2">
					{tab === 'files' ? 'Shared Files' : 'Shared Texts'}
				</h2>
				{/* Tabs */}
				<div className="flex gap-4 sm:gap-8 border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
					<button
						className={`pb-2 text-base font-medium border-b-2 transition whitespace-nowrap ${
							tab === 'files'
								? 'border-blue-600 text-blue-600'
								: 'border-transparent text-gray-500 hover:text-blue-600'
						}`}
						onClick={() => setTab('files')}
					>
						Files
					</button>
					<button
						className={`pb-2 text-base font-medium border-b-2 transition whitespace-nowrap ${
							tab === 'texts'
								? 'border-blue-600 text-blue-600'
								: 'border-transparent text-gray-500 hover:text-blue-600'
						}`}
						onClick={() => setTab('texts')}
					>
						Texts
					</button>
				</div>
				{/* Table or Cards */}
				<div className="w-full">
					{/* Desktop Table */}
					<div className="hidden sm:block bg-white rounded-xl shadow p-0 overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 text-sm">
							<thead>
								<tr className="text-gray-700 font-semibold bg-gray-50">
									<th className="px-4 py-3 text-left">Type</th>
									<th className="px-4 py-3 text-left">Title</th>
									<th className="px-4 py-3 text-left">Content</th>
									<th className="px-4 py-3 text-left">Sharing Code</th>
									<th className="px-4 py-3 text-left">Created</th>
									<th className="px-4 py-3 text-left">Expiry</th>
									<th className="px-4 py-3 text-left">Status</th>
									<th className="px-4 py-3"></th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100">
								{filteredShares.length === 0 ? (
									<tr>
										<td colSpan={8} className="text-center py-10 text-gray-400">
											No {tab === 'files' ? 'files' : 'texts'} found.
										</td>
									</tr>
								) : (
									filteredShares.map((share, idx) => (
										<tr
											key={share.id || idx}
											className="hover:bg-blue-50 transition cursor-pointer"
											onClick={e => {
												// Prevent row click if edit/delete button is clicked
												if ((e.target as HTMLElement).closest('button')) return;
												setDetailShare(share);
											}}
										>
											<td className="px-4 py-4 align-top">
												<div className="flex items-center gap-2">
													{share.type === 'file' ? (
														<Upload className="h-5 w-5 text-blue-500" />
													) : (
														<FileText className="h-5 w-5 text-gray-500" />
													)}
													<span className="capitalize text-xs text-gray-500">{share.type}</span>
												</div>
											</td>
											<td className="px-4 py-4 align-top font-semibold text-gray-900">
												{share.title ? share.title : share.name}
											</td>
											<td className="px-4 py-4 align-top text-gray-700 max-w-xs break-words">
												{share.type === 'file'
													? share.fileType || 'File'
													: (share.content?.replace(/<[^>]*>/g, '').slice(0, 80) || '') +
													  (share.content?.replace(/<[^>]*>/g, '').length > 80 ? '...' : '')}
											</td>
											<td className="px-4 py-4 align-top font-mono text-base text-primary-700">
												{share.accessCode}
											</td>
											<td className="px-4 py-4 align-top text-gray-700">
												{formatDate(share.createdAt)}
											</td>
											<td className="px-4 py-4 align-top text-gray-700">
												{getExpiryLabel(share)}
											</td>
											<td className="px-4 py-4 align-top">
												<span
													className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border border-green-300 text-green-600 bg-white`}
													style={{
														borderWidth: 1.5,
														minWidth: 70,
														textAlign: 'center',
														background: '#fff',
													}}
												>
													ACTIVE
												</span>
											</td>
											<td className="px-4 py-4 align-top flex gap-2">
												<button
													className="text-gray-400 hover:text-blue-600"
													onClick={e => {
														e.stopPropagation();
														setEditShare(share);
														setShowAddModal(true);
														setAddType(share.type === 'file' ? 'file' : 'text');
													}}
													title="Edit"
												>
													<Edit2 className="w-4 h-4" />
												</button>
												<button
													className="text-gray-400 hover:text-red-500"
													title="Delete"
													onClick={e => {
														e.stopPropagation();
														handleDelete(share.id);
													}}
												>
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														strokeWidth={2}
														viewBox="0 0 24 24"
													>
														<path d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
					{/* Mobile Cards */}
					<div className="sm:hidden flex flex-col gap-4">
						{filteredShares.length === 0 ? (
							<div className="text-center py-10 text-gray-400">
								No {tab === 'files' ? 'files' : 'texts'} found.
							</div>
						) : (
							filteredShares.map((share, idx) => (
								<div
									key={share.id || idx}
									className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100 cursor-pointer hover:bg-blue-50"
									onClick={e => {
										// Prevent card click if edit/delete button is clicked
										if ((e.target as HTMLElement).closest('button')) return;
										setDetailShare(share);
									}}
								>
									<div className="flex items-center gap-2 mb-1">
										{share.type === 'file' ? (
											<Upload className="h-5 w-5 text-blue-500" />
										) : (
											<FileText className="h-5 w-5 text-gray-500" />
										)}
										<span className="capitalize text-xs text-gray-500">{share.type}</span>
										<span className="font-semibold text-gray-900">{share.title ? share.title : share.name}</span>
									</div>
									<div className="text-xs text-gray-500">
										<span className="font-semibold">Content: </span>
										{share.type === 'file'
											? share.fileType || 'File'
											: (share.content?.replace(/<[^>]*>/g, '').slice(0, 80) || '') +
											  (share.content?.replace(/<[^>]*>/g, '').length > 80 ? '...' : '')}
									</div>
									<div className="text-xs text-gray-500">
										<span className="font-semibold">Sharing Code: </span>
										<span className="font-mono text-base text-primary-700">
											{share.accessCode}
										</span>
									</div>
									<div className="text-xs text-gray-500">
										<span className="font-semibold">Created: </span>
										{formatDate(share.createdAt)}
									</div>
									<div className="text-xs text-gray-500">
										<span className="font-semibold">Expiry: </span>
										{getExpiryLabel(share)}
									</div>
									<div className="flex justify-between items-center mt-1">
										<span
											className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border border-green-300 text-green-600 bg-white`}
											style={{
												borderWidth: 1.5,
												minWidth: 70,
												textAlign: 'center',
												background: '#fff',
											}}
										>
											ACTIVE
										</span>
										<div className="flex gap-4">
											<button
												className="text-gray-400 hover:text-blue-600"
												onClick={e => {
													e.stopPropagation();
													setEditShare(share);
													setShowAddModal(true);
													setAddType(share.type === 'file' ? 'file' : 'text');
												}}
												title="Edit"
											>
												<Edit2 className="w-4 h-4" />
											</button>
											<button
												className="text-gray-400 hover:text-red-500"
												title="Delete"
												onClick={e => {
													e.stopPropagation();
													handleDelete(share.id);
												}}
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													viewBox="0 0 24 24"
												>
													<path d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</main>

			{/* Add/Edit Modal */}
			{showAddModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div 
						ref={modalRef}
						className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-2 sm:mx-0 p-4 sm:p-8 max-h-[70vh] overflow-y-auto"
					>
						<div className="mb-4 flex justify-between items-center">
							<h3 className="text-lg font-semibold">
								{editShare
									? `Edit ${editShare.type === 'file' ? 'File' : 'Text'}`
									: 'Share File or Text'}
							</h3>
							<button
								className="text-gray-400 hover:text-gray-600"
								onClick={() => {
									setEditShare(null);
									setShowAddModal(false);
									setAddType(null);
								}}
							>
								×
							</button>
						</div>
						{/* Modal Content */}
						{editShare ? (
							<div className="mt-6">
								{editShare.type === 'file' ? (
									<ShareFileForm
										editShare={editShare}
										onSuccess={() => {
											setEditShare(null);
											setAddType(null);
											setShowAddModal(false);
											refreshShares();
										}}
										showNeverExpireOption={true}
										showTitleField={true}
										prefillData={{
											...editShare,
											expiry: editShare.expiresAt || editShare.expiry,
										}}
									/>
								) : (
									<ShareTextForm
										editShare={editShare}
										onSuccess={() => {
											setEditShare(null);
											setAddType(null);
											setShowAddModal(false);
											refreshShares();
										}}
										showNeverExpireOption={true}
										prefillData={{
											...editShare,
											expiry: editShare.expiresAt || editShare.expiry,
										}}
									/>
								)}
							</div>
						) : (
							<>
								{/* Step 1: Choose type */}
								{!addType && (
									<div className="flex flex-col items-center gap-4">
										<button
											className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
											onClick={() => setAddType('file')}
										>
											Share File
										</button>
										<button
											className="w-full py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
											onClick={() => setAddType('text')}
										>
											Share Text
										</button>
									</div>
								)}
								{/* Step 2: Show form based on type */}
								{addType === 'file' && (
									<div className="mt-6">
										<div className="font-semibold mb-2">Share a File</div>
										<ShareFileForm
											onSuccess={() => {
												setShowAddModal(false);
												setAddType(null);
												refreshShares();
											}}
											showNeverExpireOption={true}
											showTitleField={true}
										/>
										<button
											className="mt-4 text-sm text-gray-400 hover:text-gray-600"
											onClick={() => setAddType(null)}
										>
											Back
										</button>
									</div>
								)}
								{addType === 'text' && (
									<div className="mt-6">
										<div className="font-semibold mb-2">Share a Text</div>
										<ShareTextForm
											onSuccess={() => {
												setShowAddModal(false);
												setAddType(null);
												refreshShares();
											}}
											showNeverExpireOption={true}
										/>
										<button
											className="mt-4 text-sm text-gray-400 hover:text-gray-600"
											onClick={() => setAddType(null)}
										>
											Back
										</button>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			)}

			{/* Details Modal */}
			{detailShare && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div 
						ref={detailModalRef}
						className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-2 sm:mx-0 p-6 max-h-[80vh] overflow-y-auto"
					>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">
								{detailShare.title ? detailShare.title : detailShare.name}
							</h3>
							<button
								className="text-gray-400 hover:text-gray-600"
								onClick={() => setDetailShare(null)}
							>
								×
							</button>
						</div>
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								{detailShare.type === 'file' ? (
									<Upload className="h-5 w-5 text-blue-500" />
								) : (
									<FileText className="h-5 w-5 text-gray-500" />
								)}
								<span className="capitalize text-xs text-gray-500">{detailShare.type}</span>
							</div>
							<div>
								<span className="font-semibold">Content: </span>
								<span className="break-words">
									{detailShare.type === 'file'
										? detailShare.fileType || 'File'
										: (
											<div 
												className="prose max-w-none mt-2"
												dangerouslySetInnerHTML={{ __html: detailShare.content }}
											/>
										)}
								</span>
							</div>
							<div>
								<span className="font-semibold">Sharing Code: </span>
								<span className="font-mono text-base text-primary-700">
									{detailShare.accessCode}
								</span>
							</div>
							<div>
								<span className="font-semibold">Created: </span>
								{formatDate(detailShare.createdAt)}
							</div>
							<div>
								<span className="font-semibold">Expiry: </span>
								{getExpiryLabel(detailShare)}
							</div>
							<div>
								<span className="font-semibold">Status: </span>
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border border-green-300 text-green-600 bg-white`}
									style={{
										borderWidth: 1.5,
										minWidth: 70,
										textAlign: 'center',
										background: '#fff',
									}}
								>
									ACTIVE
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardPage;